import { cn } from "@/utils/cn"
import { FileText } from "lucide-react"

import InlineEditor from "@/components/inline-editor"

interface SidebarFileProps {
  isSelected?: boolean
  title?: string
}

export const SidebarFile = ({ isSelected, title }: SidebarFileProps) => {
  return (
    <div
      className={cn(
        "flex h-7 flex-1 cursor-pointer items-center gap-2 rounded-md px-1 py-4 text-sm font-medium text-primary transition-all hover:bg-el",
        {
          "bg-el": isSelected,
        }
      )}
    >
      <FileText className="h-5 w-5 text-shade-seondary" />
      <InlineEditor
        placeholder="Untiled File"
        value={title}
        className="w-full resize-none appearance-none overflow-hidden bg-transparent py-2 text-sm text-shade-primary focus:outline-none"
      />
    </div>
  )
}
