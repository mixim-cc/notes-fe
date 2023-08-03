import { state } from "@/services/state";
import { startImmediateSync } from "../sync";

type RemoveArgs = {
  id: string;
};

export const remove = ({ id }: RemoveArgs) => {
  const fileSystem = state.fs.fileSystem?.get();

  const structure = fileSystem.find((fs) => fs.id === id);

  if (!structure) {
    throw new Error(`${id} Structure Not found`);
  }

  if (structure.type === "FOLDER") {
    const childrens = fileSystem.filter((f) => f.parentId === structure.id);

    if (childrens.length !== 0) {
      throw new Error(
        `Folder is not empty. Please delete all files before deleting folder`
      );
    }

    state.fs.fileSystem.set((prev) => prev.filter((fs) => fs.id !== id));
    state.fs.deletedIds.set((prev) => [...prev, String(structure.synced_id)]);
  } else {
    state.fs.fileSystem.set((prev) => prev.filter((fs) => fs.id !== id));
    state.fs.deletedIds.set((prev) => [...prev, String(structure.synced_id)]);
    state.selectedFileId.set(null);
  }

  startImmediateSync();
};
