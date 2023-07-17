"use client"

import { useState } from "react"
import {
  copyFile,
  deleteFile,
  editFileTitle,
  setSelectedFile,
  triggerSync,
} from "@/services/redux/reducers/file-explorer-reducer"
import { useAppDispatch, useAppSelector } from "@/services/redux/store"
import { syncAfterDelay } from "@/services/redux/utils/syncAfterDelay"
import { cn } from "@/utils/cn"
import { AnimatePresence, motion } from "framer-motion"
import { useHotkeys } from "react-hotkeys-hook"

import { SidebarAdd } from "./sidebar-add"
import { SidebarFile } from "./sidebar-file"
import { SidebarFolderTree } from "./sidebar-folder-tree"
import { SidebarHeader } from "./sidebar-header"

export const NoteSidebar = () => {
  const dispatch = useAppDispatch()
  const [selectedTab, setSelectedTab] = useState<"default" | "journal">("default")
  const { structure, selectedFile, isSidebarVisible } = useAppSelector((state) => state.fileExplorerReducer)

  const individualFiles = structure?.filter((f) => !f?.parentId && f?.type === "FILE")
  const journalFolderId = structure?.find((f) => f?.title === "Journal")?.id
  const journalFiles = structure?.filter((f) => f?.parentId === journalFolderId && f?.type === "FILE")

  useHotkeys("g + n", () => setSelectedTab("default"), [selectedTab])
  useHotkeys("g + h", () => setSelectedTab("journal"), [selectedTab])

  return (
    <AnimatePresence>
      {isSidebarVisible && (
        <motion.div
          key="sidebar"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "320px", opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          className={cn(
            "flex h-full w-[320px] shrink-0 flex-col gap-4 overflow-y-auto rounded-lg border border-stroke-base bg-base transition-transform"
          )}
        >
          <SidebarHeader tab={selectedTab} onTabChange={(value) => setSelectedTab(value)} />
          {selectedTab === "default" && (
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
                      syncAfterDelay()
                    }}
                    onCopy={() => {
                      dispatch(copyFile(file))
                      dispatch(triggerSync())
                    }}
                    onDelete={() => {
                      dispatch(deleteFile({ id: file.id }))
                      dispatch(triggerSync())
                    }}
                    onStar={() => {}}
                  />
                ))}
              </div>
            </div>
          )}

          {selectedTab === "journal" && (
            <div className="flex flex-col gap-4 px-4">
              <div>
                {journalFiles?.map((file) => (
                  <SidebarFile
                    title={file.title}
                    isSelected={file?.id === selectedFile}
                    onFileClick={() => {
                      dispatch(setSelectedFile({ id: file.id }))
                    }}
                    onTitleChange={(e) => {
                      dispatch(editFileTitle({ id: file.id, title: e.target.value }))
                      syncAfterDelay()
                    }}
                    onCopy={() => {
                      dispatch(copyFile(file))
                      dispatch(triggerSync())
                    }}
                    onDelete={() => {
                      dispatch(deleteFile({ id: file.id }))
                      dispatch(triggerSync())
                    }}
                    onStar={() => {}}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
