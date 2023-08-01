import { OutputData } from "@editorjs/editorjs";
import { state } from "../..";
import { startSync } from "../sync";

interface LoadFileContentArgs {
  id: string;
  content: OutputData;
  title?: string;
}

export const editFileContent = ({
  id,
  content,
  title,
}: LoadFileContentArgs) => {
  state.fs.fileSystem.set((prev) =>
    prev.map((fs) =>
      fs?.id === id
        ? {
            ...fs,
            title: title || fs.title,
            content,
            synced: false,
            isSyncing: true,
          }
        : fs
    )
  );
  startSync();
};
