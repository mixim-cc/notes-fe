import { useAppSelector } from "@/services/redux/store"

import { Accordion } from "@/components/ui/accordion"

import { EditorFolder } from "./sidebar-folder"

export const SidebarFolderTree = () => {
  const { structure, selectedFile } = useAppSelector((state) => state.fileExplorerReducer)

  const rootFolders = structure?.filter((struct) => !struct.parentId && struct.type === "FOLDER")

  return (
    <Accordion
      type="single"
      className="w-full"
      defaultValue={structure?.find((s) => s.id === selectedFile)?.parentId}
    >
      {rootFolders?.map((folder) => (
        <EditorFolder
          folderTitle={folder.title}
          files={structure?.filter((struct) => struct.parentId === folder.id)}
          folderId={folder.id}
        />
      ))}
    </Accordion>
  )
}
