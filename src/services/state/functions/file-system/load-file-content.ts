import { OutputData } from "@editorjs/editorjs";
import { state } from "../..";

interface LoadFileContentArgs {
  id: string;
  content: OutputData;
}

export const loadFileContent = ({ id, content }: LoadFileContentArgs) => {
  state.fs.fileSystem.set((prev) =>
    prev.map((fs) =>
      fs?.id === id
        ? {
            ...fs,
            content,
            synced: true,
            lastSyncedDate: new Date(),
            isSyncing: false,
          }
        : fs
    )
  );
};
