import { FolderIcon, Link, MoreHorizontal, PanelLeftClose, Star } from "lucide-react"

import { IconButton } from "@/components/ui/icon-button"

interface EditorTopBarProps {
  id?: string
  fileTitle: string
}

export const EditorHeader = ({ fileTitle, id }: EditorTopBarProps) => {
  return (
    <div className="flex items-center justify-between gap-4 px-4 h-12 border-b border-stroke-base">
      <div className="flex items-center gap-4">
        <IconButton size="sm">
          <PanelLeftClose className="h-5 w-5 text-shade-seondary" />
        </IconButton>

        <div className="h-3 w-0.5 rounded-xl bg-stroke-back"></div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <FolderIcon className="h-5 w-5 text-shade-seondary" />
            <p className="text-sm text-shade-secondary">Ideas</p>
          </div>
          <p className="text-sm text-shade-secondary">/</p>
          <p className="text-sm text-shade-primary">{fileTitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <IconButton size="sm" variant="ghost">
          <Star className="h-4 w-4 text-shade-seondary" />
        </IconButton>
        <IconButton size="sm" variant="ghost">
          <Link className="h-4 w-4 text-shade-seondary" />
        </IconButton>
        <IconButton size="sm" variant="ghost">
          <MoreHorizontal className="h-4 w-4 text-shade-seondary" />
        </IconButton>
      </div>
    </div>
  )
}
