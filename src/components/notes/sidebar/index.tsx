import { SidebarAdd } from "./sidebar-add"
import { SidebarFile } from "./sidebar-file"
import { SidebarFolderTree } from "./sidebar-folder-tree"
import { SidebarHeader } from "./sidebar-header"

export const NoteSidebar = () => {
  return (
    <div className="h-full w-[320px] flex flex-col gap-4 flex-shrink-0 overflow-y-auto bg-base border border-stroke-base rounded-lg">
      <SidebarHeader />
      <div className="flex flex-col gap-4 px-4">
        <SidebarAdd />
        <SidebarFolderTree />
        <div className="h-1 w-full border-t border-stroke-base"></div>
        <div>
          <SidebarFile title="🧠 Life's Biggest Answer" />
          <SidebarFile isSelected title="The World's Greatest Grandpa" />
          <SidebarFile title="The Country On Fire" />
        </div>
      </div>
    </div>
  )
}
