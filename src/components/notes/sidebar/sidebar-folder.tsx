import { useRef, useState } from "react"
import {
  addNewFile,
  copyFile,
  deleteFile,
  deleteFolder,
  editFileTitle,
  setSelectedFile,
} from "@/services/redux/reducers/file-explorer-reducer"
import { useAppSelector } from "@/services/redux/store"
import { cn } from "@/utils/cn"
import { FilePlus } from "lucide-react"
import { useDispatch } from "react-redux"

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import InlineEditor from "@/components/inline-editor"

import { NotesContextMenu } from "../context-menu"
import { SidebarFile } from "./sidebar-file"

interface EditorFolderProps {
  folderId: string
  folderTitle?: string
  files: { id: string; title?: string; isSelected?: boolean }[]
}

export const EditorFolder = ({ files, folderId, folderTitle }: EditorFolderProps) => {
  const dispatch = useDispatch()
  const selectedFileId = useAppSelector((state) => state.fileExplorerReducer.selectedFile)

  return (
    <AccordionItem value={folderId}>
      <AccordionTrigger>
        <Folder folderId={folderId} folderTitle={folderTitle} />
      </AccordionTrigger>
      <AccordionContent className="pl-2">
        {files.map((file) => (
          <SidebarFile
            hasParent={true}
            isSelected={selectedFileId === file.id}
            title={file.title}
            onFileClick={() => {
              dispatch(setSelectedFile({ id: file.id }))
            }}
            onTitleChange={(e) => {
              dispatch(editFileTitle({ id: file.id, title: e.target.value }))
            }}
            onCopy={() => {
              dispatch(copyFile(file))
            }}
            onDelete={() => {
              dispatch(deleteFile({ id: file.id, parentId: folderId }))
            }}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  )
}

interface FolderProps {
  folderTitle: string
  folderId: string
}

const Folder = ({ folderId, folderTitle }: FolderProps) => {
  const ref = useRef<HTMLTextAreaElement>(undefined)
  const [isEditing, setIsEditing] = useState(false)

  const dispatch = useDispatch()

  return (
    <NotesContextMenu
      id="1"
      onCopy={() => {}}
      onDelete={() => dispatch(deleteFolder({ id: folderId }))}
      onStar={() => {}}
      onRename={() => {
        setIsEditing(true)
        if (ref.current) ref.current.focus({ preventScroll: true })
      }}
    >
      <div className="group flex h-7 w-full flex-1 items-center gap-2 rounded-md px-1 py-4 text-sm font-medium text-shade-primary transition-all hover:bg-el [&[data-state=open]>svg:first-child]:rotate-90">
        <InlineEditor
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          value={folderTitle}
          onChange={(e) => dispatch(editFileTitle({ id: folderId, title: e.target.value }))}
          className="w-full resize-none appearance-none overflow-hidden bg-transparent py-2 text-sm text-shade-primary focus:outline-none"
        />
        <FilePlus
          onClick={(e) => {
            e.preventDefault()
            dispatch(addNewFile({ parentId: folderId, title: "Untitled File" }))
          }}
          className="hidden h-4 w-4 shrink-0 cursor-pointer hover:text-shade-primary group-hover:block"
        />
      </div>
    </NotesContextMenu>
  )
}
