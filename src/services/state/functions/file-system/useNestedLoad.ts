import { useSelector } from "@legendapp/state/react";
import { state, FileSystem } from "@/services/state";
import { NoteType, useGetStructureChildQuery } from "@/services/graphql";
import { useEffect } from "react";
import { nanoid } from "nanoid";

interface UseNestedLoadProps {
  /**
   * This parentId is local parent id
   */
  parentId: string | undefined;
  enabled: boolean;
}

export const useNestedLoad = ({ parentId, enabled }: UseNestedLoadProps) => {
  const fileSystem = useSelector(state.fs.fileSystem);
  const selectedNoteId = useSelector(state.selectedFileId);

  const foundStructure = fileSystem?.find(
    (fs) => fs?.id === parentId
  ) as FileSystem;

  const parentSyncId = foundStructure?.synced_id;
  const parentDepth = foundStructure?.depth;
  const { data, isFetching, isLoading } = useGetStructureChildQuery(
    {
      parentId: String(parentSyncId),
    },
    {
      enabled: enabled && !!parentSyncId,
    }
  );

  useEffect(() => {
    if (data) {
      const nested = data?.note?.getFiles?.reduce((acc, curr, index) => {
        const id = nanoid();

        if (index === 0 && !selectedNoteId) {
          state.selectedFileId.set(id);
        }

        if (!fileSystem.some((p) => p?.synced_id === curr?.id)) {
          acc.push({
            id,
            title: String(curr?.title),
            parentId: String(parentId),
            type: curr?.type as NoteType,
            synced_parent_id: parentSyncId,
            synced: true,
            synced_id: String(curr?.id),
            open: false,
            isSyncing: false,
            lastSyncedDate: new Date(),
            depth: (parentDepth || 0) + 1,
          });
        }

        return acc;
      }, [] as FileSystem[]);

      if (nested) {
        state.fs.fileSystem.set((prev) => [...prev, ...nested]);
      }
    }
  }, [isLoading]);

  return { data, isLoading: isFetching };
};
