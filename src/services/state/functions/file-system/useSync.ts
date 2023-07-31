import {
  useDeleteNoteMutation,
  useUpsertAnyMutation,
} from "@/services/graphql";
import { FileSystem, state } from "@/services/state";
import { useObserve, useSelector } from "@legendapp/state/react";
import _ from "lodash";

export const useSync = () => {
  const { mutateAsync, isLoading } = useUpsertAnyMutation();
  const { mutateAsync: deleteNote, isLoading: isDeleteLoading } =
    useDeleteNoteMutation();

  const syncWithAPI = async (fileSystem: FileSystem[]) => {
    const responses = await Promise.all(
      fileSystem.map(async (fs) => {
        if (!fs.synced) {
          const resposne = await mutateAsync({
            id: fs.synced_id,
            noteType: fs.type,
            data: {
              data: fs?.content as unknown as Record<string, unknown>,
              parentId: fs?.synced_parent_id || undefined,
              title: fs?.title,
            },
          });

          return { data: resposne, fe_data: fs };
        }

        return { fe_data: fs };
      })
    );

    const updatedStructure = responses?.map((response) => {
      const res = response?.data;

      return {
        ...response?.fe_data,
        synced: true,
        synced_id: String(
          response?.fe_data?.synced_id || res?.note?.upsertAny?.id
        ),
        synced_parent_id: String(
          response?.fe_data?.synced_parent_id ||
            res?.note?.upsertAny?.parentId ||
            ""
        ),
      };
    });

    return updatedStructure;
  };

  useObserve(async () => {
    if (state.startSync.get()) {
      const updatedStructure = await syncWithAPI(state.fs.fileSystem.get());

      if (updatedStructure) {
        state.startSync.set(false);
        state.fs.fileSystem.assign(updatedStructure);
      }
    }
  });

  useObserve(async () => {
    const responses = await Promise.all(
      state.fs.deletedIds.get().map(async (id) => {
        const response = await deleteNote({ id });
        if (response) {
          state.fs.deletedIds.set((prev) => prev.filter((p) => p !== id));
        }
      })
    );
  });

  return { isLoading, isDeleteLoading };
};
