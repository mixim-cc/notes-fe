import { addNewFile, addNewFolder, triggerSync } from "@/services/redux/reducers/file-explorer-reducer"
import { useAppDispatch } from "@/services/redux/store"
import { syncAfterDelay } from "@/services/redux/utils/syncAfterDelay"
import { FilePlus, FolderPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { IconButton } from "@/components/ui/icon-button"

export const SidebarAdd = () => {
  const dispatch = useAppDispatch()

  return (
    <div className="flex items-center justify-between gap-2 border-b border-stroke-base pb-4">
      <Button
        variant="outline"
        onClick={() => {
          dispatch(addNewFile({ parentId: null, title: "Untitled Draft" }))
          dispatch(triggerSync())
        }}
      >
        <FilePlus className="h-5 w-5 text-shade-secondary" />
        New Draft
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          dispatch(addNewFolder({ parentId: null, title: "Untitled Folder" }))
          dispatch(triggerSync())
        }}
      >
        <FolderPlus className="h-5 w-5 text-shade-secondary" />
        New Folder
      </Button>
    </div>
  )
}
