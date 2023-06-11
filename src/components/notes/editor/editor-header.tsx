import { toggleSidebarVisibility } from "@/services/redux/reducers/file-explorer-reducer"
import { useAppSelector } from "@/services/redux/store"
import { FolderIcon, Link, MoreHorizontal, PanelLeftClose, PanelLeftOpen, Star } from "lucide-react"
import { useDispatch } from "react-redux"

import { IconButton } from "@/components/ui/icon-button"

export const EditorHeader = () => {
  const dispatch = useDispatch()
  const { structure, selectedFile, isSidebarVisible } = useAppSelector((state) => state.fileExplorerReducer)

  const file = structure.find((files) => files.id === selectedFile)
  const hasParentFolder = !!file?.parentId

  return (
    <div className="flex items-center justify-between gap-4 px-4 h-12 border-b border-stroke-base">
      <div className="flex items-center gap-4">
        <IconButton size="sm" onClick={() => dispatch(toggleSidebarVisibility())}>
          {!isSidebarVisible ? (
            <PanelLeftClose className="h-5 w-5 text-shade-seondary" />
          ) : (
            <PanelLeftOpen className="h-5 w-5 text-shade-secondary" />
          )}
        </IconButton>

        <div className="h-3 w-0.5 rounded-xl bg-stroke-back"></div>

        <div className="flex items-center gap-3">
          {hasParentFolder ? (
            <>
              <div className="flex items-center gap-2">
                <FolderIcon className="h-5 w-5 text-shade-seondary" />
                <p className="text-sm text-shade-secondary">
                  {structure?.find((s) => s.id === file.parentId).title}
                </p>
              </div>
              <p className="text-sm text-shade-secondary">/</p>
            </>
          ) : null}

          <p className="text-sm text-shade-primary">{file.title}</p>
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
