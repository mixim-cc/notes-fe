import { FileSystem, state } from "@/services/state";

import { useSelector } from "@legendapp/state/react";
import { SidebarStructure } from "./sidebar-structure";

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
