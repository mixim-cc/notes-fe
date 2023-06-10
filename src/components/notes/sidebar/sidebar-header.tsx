import { Calendar, FolderIcon, Search, Star } from "lucide-react"

import { IconButton } from "@/components/ui/icon-button"

export const SidebarHeader = () => {
  return (
    <div className="flex items-center justify-between px-4 h-12 border-b border-stroke-base">
      <h1 className="text-xl font-semibold text-shade-primary leading-none">Notes</h1>
      <div className="flex items-center gap-2">
        <IconButton variant="ghost">
          <FolderIcon className="h-5 w-5 text-shade-seondary" />
        </IconButton>
        <IconButton variant="ghost">
          <Search className="h-5 w-5 text-shade-seondary" />
        </IconButton>
        <IconButton variant="ghost">
          <Calendar className="h-5 w-5 text-shade-seondary" />
        </IconButton>
        <IconButton variant="ghost">
          <Star className="h-5 w-5 text-shade-seondary" />
        </IconButton>
      </div>
    </div>
  )
}
