import { ChangeEventHandler, KeyboardEventHandler } from "react"
import { cn } from "@/utils/cn"
import { FileText } from "lucide-react"

import InlineEditor from "@/components/inline-editor"

interface SidebarFileProps {
  isSelected?: boolean
  title?: string
  onTitleChange?: ChangeEventHandler<HTMLTextAreaElement>
  onTitleBlur?: () => void
  onTitleKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>
  onFileClick?: () => void
}

export const SidebarFile = ({
  isSelected,
  title,
  onTitleBlur,
  onTitleChange,
  onTitleKeyDown,
  onFileClick,
}: SidebarFileProps) => {
  return (
    <div
      onClick={onFileClick}
      className={cn(
        "flex h-7 flex-1 cursor-pointer items-center gap-2 rounded-md px-1 py-4 text-sm font-medium text-primary transition-all hover:bg-el",
        {
          "bg-el": isSelected,
        }
      )}
    >
      <FileText className="h-5 w-5 text-shade-seondary" />
      <InlineEditor
        autoFocus
        placeholder="Untiled File"
        value={title}
        maxRows={1}
        className="w-full resize-none appearance-none overflow-hidden bg-transparent py-2 text-sm text-shade-primary focus:outline-none"
        onChange={onTitleChange}
        onBlur={onTitleBlur}
        onKeyDown={onTitleKeyDown}
      />
    </div>
  )
}
