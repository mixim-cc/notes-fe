"use client";

import { NoteEditor } from "@/components/notes/editor";
import { NoteSidebar } from "@/components/notes/sidebar";
import { Oasis } from "@/components/ui/oasis";
import { useInitalLoad } from "@/services/state/functions/file-system/useInitialLoad";
import { useSync } from "@/services/state/functions/file-system/useSync";
import { motion } from "framer-motion";

export default function Page() {
  useInitalLoad();
  useSync();

  return (
    <>
      <motion.div layout className="hidden h-screen bg-base-hover  md:flex">
        <NoteSidebar />
        <NoteEditor />
      </motion.div>
      <Oasis />
    </>
  );
}
