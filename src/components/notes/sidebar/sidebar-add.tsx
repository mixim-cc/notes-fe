import { FilePlus, FolderPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { addNew } from "@/services/state/functions/file-system/add-new";

export const SidebarAdd = () => {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-stroke-base pb-4">
      <Button
        variant="outline"
        onClick={() => {
          addNew({
            parentId: "",
            title: "📜 Untitled Draft",
            type: "FILE",
          });
        }}
      >
        <FilePlus className="h-5 w-5 text-shade-secondary" />
        New Draft
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          addNew({
            parentId: "",
            title: "📂 Untitled Folder",
            type: "FOLDER",
          });
        }}
      >
        <FolderPlus className="h-5 w-5 text-shade-secondary" />
        New Folder
      </Button>
    </div>
  );
};
