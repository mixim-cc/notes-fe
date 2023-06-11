import { addNewFile, setSelectedFile } from "@/services/redux/reducers/file-explorer-reducer"
import { useAppSelector } from "@/services/redux/store"
import { cn } from "@/utils/cn"
import { FilePlus } from "lucide-react"
import { useDispatch } from "react-redux"

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import InlineEditor from "@/components/inline-editor"

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
        <InlineEditor
          value={folderTitle}
          className="w-full resize-none appearance-none overflow-hidden bg-transparent py-2 text-sm text-shade-primary focus:outline-none"
        />
        <FilePlus
          onClick={(e) => {
            e.preventDefault()
            dispatch(addNewFile({ parentId: folderId, title: "Untitled File" }))
          }}
          className="hidden h-4 w-4 shrink-0 cursor-pointer hover:text-shade-primary group-hover:block"
        />
      </AccordionTrigger>
      <AccordionContent className="pl-2">
        {files.map((file) => (
          <div
            key={file.id}
            onClick={() => dispatch(setSelectedFile({ id: file.id }))}
            className={cn("flex h-7 cursor-pointer items-center gap-2 rounded-md px-2 hover:bg-el", {
              "bg-el": selectedFileId === file.id,
            })}
          >
            <div className="h-3 w-0.5 rounded-xl bg-stroke-back"></div>
            <InlineEditor
              placeholder="Untiled File"
              value={file.title}
              className="w-full resize-none appearance-none overflow-hidden bg-transparent py-2 text-sm text-shade-primary focus:outline-none"
            />
          </div>
        ))}
      </AccordionContent>
    </AccordionItem>
  )
}
