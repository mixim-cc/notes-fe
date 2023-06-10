import { FilePlus, FolderPlus } from "lucide-react"

import { IconButton } from "@/components/ui/icon-button"

export const SidebarAdd = () => {
  return (
    <div className="flex h-10 items-center gap-2 border-b border-stroke-base">
      <IconButton variant="ghost">
        <FilePlus className="h-5 w-5 text-shade-seondary" />
      </IconButton>

      <IconButton variant="ghost">
        <FolderPlus className="h-5 w-5 text-shade-seondary" />
      </IconButton>
    </div>
  )
}
