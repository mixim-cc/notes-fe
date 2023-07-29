import { state } from "@/services/state";
import { startSync } from "../sync";

type RenameArgs = {
  id: string;
  title: string;
};

export const rename = ({ id, title }: RenameArgs) => {
  state.fs.fileSystem.set((prev) =>
    prev.map((fs) =>
      fs.id === id
        ? {
            ...fs,
            title: title,
            synced: false,
          }
        : fs
    )
  );
  startSync;
};
