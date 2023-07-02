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
    <div className="flex h-12 items-center justify-between gap-4 border-b border-stroke-base bg-base px-4">
      {" "}
      <div className="flex items-center gap-4">
        <IconButton size="sm" onClick={() => dispatch(toggleSidebarVisibility())}>
          {isSidebarVisible ? (
            <PanelLeftClose className="text-shade-seondary h-5 w-5" />
          ) : (
            <PanelLeftOpen className="h-5 w-5 text-shade-secondary" />
          )}
        </IconButton>

        <div className="h-3 w-0.5 rounded-xl bg-stroke-back"></div>

        <div className="flex items-center gap-3">
          {hasParentFolder ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <FolderIcon className="text-shade-seondary h-5 w-5" />
                <p className="text-sm text-shade-secondary">
                  {structure?.find((s) => s.id === file?.parentId)?.title}
                </p>
              </div>
              <p className="text-sm text-shade-secondary">/</p>
            </div>
          ) : null}

          <p className="text-sm text-shade-primary">{file?.title}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <IconButton size="sm" variant="ghost">
          <Star className="text-shade-seondary h-4 w-4" />
        </IconButton>
        <IconButton size="sm" variant="ghost">
          <Link className="text-shade-seondary h-4 w-4" />
        </IconButton>
        <IconButton size="sm" variant="ghost">
          <MoreHorizontal className="text-shade-seondary h-4 w-4" />
        </IconButton>
      </div>
    </div>
  )
}
