import { NoteType } from "@/services/graphql";
import { state } from "@/services/state";
import { nanoid } from "nanoid";
import { startImmediateSync } from "../sync";

type AddNewArgs = {
  title: string;
  type: NoteType;
  parentId: string;
  depth?: number;
};

export const addNew = ({ title, type, parentId, depth = 0 }: AddNewArgs) => {
  const id = nanoid();
  const parentSyncId = state.fs.fileSystem?.find(
    (fs) => fs?.id.get() === parentId
  )?.synced_id;

  state.fs.fileSystem.push({
    id,
    title,
    parentId,
    type,
    synced: false,
    open: true,
    synced_parent_id: parentSyncId?.get(),
    synced_id: undefined,
    isSyncing: true,
    depth,
    isJournal: false,
    isPublic: false,
  });

  state.fs.fileSystem.set((prev) =>
    prev.map((fs) =>
      fs.id === parentId
        ? {
            ...fs,

            open: true,
          }
        : fs
    )
  );

  if (type === "FILE") {
    state.selectedFileId.set(id);
  }
  startImmediateSync();

  return { id };
};
