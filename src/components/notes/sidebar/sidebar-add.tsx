import { FilePlus, FolderPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { addNew } from "@/services/state/functions/file-system/add-new";

export const SidebarAdd = () => {
  return (
    <div className="flex items-center justify-between gap-2 pb-4 border-b border-stroke-base">
      <Button
        className="w-full"
        variant="outline"
        onClick={() => {
          addNew({
            parentId: "",
            title: "Untitled Note",
            type: "FILE",
          });
        }}
      >
        <FilePlus size={18} className=" text-shade-secondary" />
        New Note
      </Button>
      <Button
        className="w-full"
        variant="outline"
        onClick={() => {
          addNew({
            parentId: "",
            title: "Untitled Folder",
            type: "FOLDER",
          });
        }}
      >
        <FolderPlus size={18} className="w-5 h-5 text-shade-secondary" />
        New Folder
      </Button>
    </div>
  );
};
