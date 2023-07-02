import { apiClient } from "@/services/graphql/generated/axiosHelper"
import {
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

    if (action.type === "file-explorer/triggerSync") {
      const responses = await Promise.all(
        getState().fileExplorerReducer.structure.map(async (structure) => {
          if (!structure.synced && structure.content) {
            const response = await apiClient<UpsertNoteMutation, UpsertNoteMutationVariables>(
              UpsertNoteDocument
            )({
              id: structure.synced_id || undefined,
              data: {
                title: structure.title,
                parentId: structure.parentId,
                data: structure.content as unknown as Record<string, string>,
              },
            })
            return { data: response, fe_data: structure }
          }

          return { fe_data: structure }
        })
      )

      const updatedStructure = responses.map((response) => {
        return {
          ...response?.fe_data,
          synced: true,
          synced_id: response?.fe_data?.synced_id || response?.data?.note?.upsertNote?.id,
        } as FileStructure
      })

      dispatch(updateEntireTree({ structure: updatedStructure }))
    }

    return result
  }

export default useSyncMiddleware
