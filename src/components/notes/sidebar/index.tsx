"use client"

import { editFileTitle, setSelectedFile } from "@/services/redux/reducers/file-explorer-reducer"
import { useAppDispatch, useAppSelector } from "@/services/redux/store"
import { cn } from "@/utils/cn"

import { SidebarAdd } from "./sidebar-add"
import { SidebarFile } from "./sidebar-file"
import { SidebarFolderTree } from "./sidebar-folder-tree"
import { SidebarHeader } from "./sidebar-header"

export const NoteSidebar = () => {
  const dispatch = useAppDispatch()
  const { structure, selectedFile, isSidebarVisible } = useAppSelector((state) => state.fileExplorerReducer)

  const individualFiles = structure?.filter((f) => !f?.parentId && f.type === "FILE")

  return (
    <div
      className={cn(
        "h-full w-[320px] transition-transform flex flex-col gap-4 flex-shrink-0 overflow-y-auto bg-base border border-stroke-base rounded-lg",
        {
          hidden: isSidebarVisible,
        }
      )}
    >
      <SidebarHeader />
      <div className="flex flex-col gap-4 px-4">
        <SidebarAdd />
        <SidebarFolderTree />
        <div className="h-1 w-full border-t border-stroke-base"></div>
        <div>
          {individualFiles?.map((file) => (
            <SidebarFile
              title={file.title}
              isSelected={file?.id === selectedFile}
              onFileClick={() => {
                dispatch(setSelectedFile({ id: file.id }))
              }}
              onTitleChange={(e) => {
                dispatch(editFileTitle({ id: file.id, title: e.target.value }))
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
