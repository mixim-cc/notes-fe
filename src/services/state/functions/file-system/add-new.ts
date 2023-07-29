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
  const parentSyncId = state.fs.fileSystem?.find(
    (fs) => fs?.id.get() === parentId
  )?.synced_id;

  state.fs.fileSystem.push({
    id: nanoid(),
    title: title,
    parentId,
    type,
    synced: false,
    synced_parent_id: parentSyncId?.get(),
    synced_id: undefined,
    depth,
  });
  startImmediateSync();
};
