import { cn } from "@/utils/cn"
import { FilePlus } from "lucide-react"

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import InlineEditor from "@/components/inline-editor"

interface EditorFolderProps {
  id: string
  files: { id: string; title?: string; isSelected?: boolean }[]
}

export const EditorFolder = ({ files, id }: EditorFolderProps) => {
  return (
    <AccordionItem value={id}>
      <AccordionTrigger>
        <InlineEditor
          value="Folder #1"
          className="w-full resize-none appearance-none overflow-hidden bg-transparent py-2 text-sm text-shade-primary focus:outline-none"
        />
        <FilePlus className="hidden h-4 w-4 shrink-0 cursor-pointer hover:text-shade-primary group-hover:block" />
      </AccordionTrigger>
      <AccordionContent className="pl-2">
        {files.map((file) => (
          <div
            key={file.id}
            className={cn("flex h-7 cursor-pointer items-center gap-2 rounded-sm px-2 hover:bg-el", {
              "bg-el": !!file.isSelected,
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
