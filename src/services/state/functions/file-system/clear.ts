import { initialState, state } from "../..";

export const clear = () => {
  state.fs.fileSystem.set([]);
  state.fs.selectedFileId.set("");
};
