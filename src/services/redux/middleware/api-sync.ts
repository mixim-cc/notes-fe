import { apiClient } from "@/services/graphql/generated/axiosHelper"
import {
  AddFolderDocument,
  AddFolderMutation,
  AddFolderMutationVariables,
  UpsertNoteDocument,
  UpsertNoteMutation,
  UpsertNoteMutationVariables,
} from "@/services/graphql/generated/graphql"
import { Middleware } from "redux"

import { FileStructure, updateEntireTree } from "../reducers/file-explorer-reducer"
import { RootState } from "../store"

const useSyncMiddleware: Middleware<{}, RootState> =
  ({ getState, dispatch }) =>
  (next) =>
  async (action) => {
    const result = next(action)

    try {
      if (action.type === "file-explorer/triggerSync") {
        const responses = await Promise.all(
          getState().fileExplorerReducer.structure.map(async (structure) => {
            if (!structure.synced) {
              if (structure.type === "FILE") {
                const response = await apiClient<UpsertNoteMutation, UpsertNoteMutationVariables>(
                  UpsertNoteDocument
                )({
                  id: structure.synced_id || undefined,
                  data: {
                    title: structure.title,
                    parentId: getState().fileExplorerReducer.structure.find(
                      (f) => f.id === structure.parentId
                    ).synced_id,
                    data: structure.content as unknown as Record<string, string>,
                  },
                })
                return { data: response, fe_data: structure }
              } else {
                const response = await apiClient<AddFolderMutation, AddFolderMutationVariables>(
                  AddFolderDocument
                )({
                  id: structure.synced_id || undefined,
                  title: structure.title,
                })
                return { data: response, fe_data: structure }
              }
            }

            return { fe_data: structure }
          })
        )

        const updatedStructure = responses.map((response) => {
          const res = response?.data?.note

          if (res && "upsertFolder" in res) {
            return {
              ...response?.fe_data,
              synced: true,
              synced_id: response?.fe_data?.synced_id || res?.upsertFolder?.id,
            } as FileStructure
          } else if (res && "upsertNote" in res) {
            return {
              ...response?.fe_data,
              synced: true,
              synced_id: response?.fe_data?.synced_id || res?.upsertNote?.id,
            } as FileStructure
          } else {
            return response?.fe_data
          }
        })

        dispatch(updateEntireTree({ structure: updatedStructure }))
      }
    } catch (e) {
      console.log(e)
    }
    return result
  }

export default useSyncMiddleware
