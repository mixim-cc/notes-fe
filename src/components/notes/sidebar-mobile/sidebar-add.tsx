import { FilePlus, FolderPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { addNew } from "@/services/state/functions/file-system/add-new";

export const SidebarAdd = () => {
  return (
    <div className="flex items-center justify-start gap-2 ">
      <Button
        variant="outline"
        className="w-full h-12"
        onClick={() => {
          addNew({
            parentId: "",
            title: "Untitled Note",
            type: "FILE",
          });
        }}
      >
        <FilePlus className="w-6 h-6 text-shade-secondary" />
        New Note
      </Button>
      <Button
        variant="outline"
        className="w-full h-12"
        onClick={() => {
          addNew({
            parentId: "",
            title: "Untitled Folder",
            type: "FOLDER",
          });
        }}
      >
        <FolderPlus className="w-6 h-6 text-shade-secondary" />
        New Folder
      </Button>
    </div>
  );
};
