import { FileSystem, state } from "@/services/state";
import { useInitalLoad } from "@/services/state/functions/file-system/useInitialLoad";
import { useSync } from "@/services/state/functions/file-system/useSync";
import { useSelector } from "@legendapp/state/react";
import { SidebarStructure } from "./sidebar-structure";
import { NoteType } from "@/services/graphql";

export const SidebarFileSystem = () => {
  const fileSystem = useSelector(state.fs.fileSystem);

  return (
    <SidebarStructure
      depth={0}
      folders={
        fileSystem?.filter(
          (f) => !f?.parentId && f?.type === "FOLDER" && f?.title !== "Journal"
        ) as FileSystem[]
      }
    />
  );
};
