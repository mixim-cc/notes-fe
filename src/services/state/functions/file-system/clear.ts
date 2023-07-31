import { initialState, state } from "../..";

export const clear = () => {
  state.fs.fileSystem.set([]);
  state.fs.deletedIds.set([]);
  state.fs.selectedFileId.set("");
};
