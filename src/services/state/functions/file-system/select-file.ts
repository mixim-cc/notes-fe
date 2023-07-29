import { state } from "../..";

type SelectFileArgs = { id: string };

export const selectFile = ({ id }: SelectFileArgs) => {
  state.fs.selectedFileId.set(id);
};
