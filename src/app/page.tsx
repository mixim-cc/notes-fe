"use client";

import { NoteEditor } from "@/components/notes/editor";
import { NoteSidebar } from "@/components/notes/sidebar";
import { Oasis } from "@/components/ui/oasis";
import { setNetworkStatus } from "@/services/state/functions/file-system/set-network-status";
import { useInitalLoad } from "@/services/state/functions/file-system/useInitialLoad";
import { useSync } from "@/services/state/functions/file-system/useSync";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Page() {
  useInitalLoad();
  useSync();

  useEffect(() => {
    const onlineHandler = () => {
      setNetworkStatus({ status: "online" });
    };

    const offlineHandler = () => {
      setNetworkStatus({ status: "offline" });
    };

    if (typeof window !== undefined) {
      window.addEventListener("online", onlineHandler);
      window.addEventListener("offline", offlineHandler);
    }

    return () => {
      if (typeof window !== undefined) {
        window.removeEventListener("online", onlineHandler);
        window.removeEventListener("offline", offlineHandler);
      }
    };
  }, []);

  return (
    <>
      <motion.div
        layout
        className="hidden h-screen bg-base-hover md:flex md:gap-4 md:p-4"
      >
        <NoteSidebar />
        <NoteEditor />
      </motion.div>
      <Oasis />
    </>
  );
}
