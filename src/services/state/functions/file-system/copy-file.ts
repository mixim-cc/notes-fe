import { state } from "@/services/state";
import { nanoid } from "nanoid";
import { startImmediateSync } from "../sync";

type CopyFileArgs = {
  id: string;
};

export const copyFile = ({ id }: CopyFileArgs) => {
  const file = state.fs.fileSystem.find((fs) => fs.id.get() === id)?.get();

  if (file) {
    state.fs.fileSystem.set((prev) => [
      ...prev,
      {
        ...file,
        id: nanoid(),
        synced_id: undefined,
        synced: false,
      },
    ]);
  }
  startImmediateSync();
};
