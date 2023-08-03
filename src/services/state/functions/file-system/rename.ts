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
            open: true,
            isSyncing: true,

            synced: false,
          }
        : fs
    )
  );
  startSync();
};
