import { OutputData } from "@editorjs/editorjs";
import { state } from "../..";
import { startSync } from "../sync";

interface MakePublicArgs {
  id: string;
}

export const makePublic = ({ id }: MakePublicArgs) => {
  state.fs.fileSystem.set((prev) =>
    prev.map((fs) => (fs?.id === id ? { ...fs, isPublic: true } : fs))
  );
};
