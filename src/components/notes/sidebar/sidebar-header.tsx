import { Calendar, FolderIcon, Search, Star } from "lucide-react"

import { IconButton } from "@/components/ui/icon-button"

export const SidebarHeader = () => {
  return (
    <div className="flex h-12 items-center justify-between border-b border-stroke-base px-4">
      <h1 className="text-xl font-semibold leading-none text-shade-primary">Notes</h1>
      <div className="flex items-center gap-2">
        <IconButton variant="ghost">
          <FolderIcon className="text-shade-seondary h-5 w-5" />
        </IconButton>
        <IconButton variant="ghost">
          <Calendar className="text-shade-seondary h-5 w-5" />
        </IconButton>
        <IconButton variant="ghost">
          <Star className="text-shade-seondary h-5 w-5" />
        </IconButton>
      </div>
    </div>
  )
}
