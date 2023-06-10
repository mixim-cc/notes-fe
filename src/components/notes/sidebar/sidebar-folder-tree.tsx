import { Accordion } from "@/components/ui/accordion"

import { EditorFolder } from "./sidebar-folder"

export const SidebarFolderTree = () => {
  return (
    <Accordion type="multiple" className="w-full">
      <EditorFolder
        id="1"
        files={[
          { id: "1", isSelected: false, title: "Life's Biggest Answer" },
          { id: "2", isSelected: false, title: "Fuck Life" },
          { id: "4", isSelected: false, title: "Love Life" },
        ]}
      />
      <EditorFolder id="2" files={[{ id: "2", isSelected: false, title: "Fuck Life" }]} />
      <EditorFolder id="3" files={[{ id: "3", isSelected: false, title: "The World Is Here!" }]} />
    </Accordion>
  )
}
