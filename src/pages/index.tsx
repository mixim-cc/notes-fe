"use client"

import { useEffect } from "react"
import Image from "next/image"
import { useGetNoteFolderStructureQuery } from "@/services/graphql/generated/graphql"
import {
  loadInitalData,
  setNetworkStatus,
  triggerSync,
} from "@/services/redux/reducers/file-explorer-reducer"
import { useAppDispatch, useAppSelector } from "@/services/redux/store"
import { hasSeenWhatsNewModal } from "@/utils/userPreferences"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { useTheme } from "next-themes"
import { useHotkeys } from "react-hotkeys-hook"

import { Oasis } from "@/components/ui/oasis"
import WhatsNewModal from "@/components/global/WhatsNew"
import { NoteEditor } from "@/components/notes/editor"
import { NoteSidebar } from "@/components/notes/sidebar"

export default function Home() {
  const dispatch = useAppDispatch()
  const { data, isFetching } = useGetNoteFolderStructureQuery()
  const { selectedFile, structure } = useAppSelector((state) => state.fileExplorerReducer)
  const { setTheme, theme } = useTheme()

  useHotkeys("alt + t", () => setTheme(theme === "light" ? "dark" : "light"), {
    enabled: true,
    enableOnContentEditable: true,
    enableOnFormTags: true,
    preventDefault: true,
  })

  useEffect(() => {
    if (data?.note?.listAll && !structure.length) dispatch(loadInitalData({ data: data?.note?.listAll }))
  }, [data?.note?.listAll, dispatch, isFetching])

  useEffect(() => {
    const onlineHandler = () => {
      dispatch(setNetworkStatus({ status: "online" }))
      dispatch(triggerSync())
    }

    const offlineHandler = () => {
      dispatch(setNetworkStatus({ status: "offline" }))
      dispatch(triggerSync())
    }

    if (typeof window !== undefined) {
      window.addEventListener("online", onlineHandler)
      window.addEventListener("offline", offlineHandler)
    }

    return () => {
      if (typeof window !== undefined) {
        window.removeEventListener("online", onlineHandler)
        window.removeEventListener("offline", offlineHandler)
      }
    }
  }, [])

  if (isFetching && !selectedFile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-gray-800" />
      </div>
    )
  }

  return (
    <div>
      <head>
        <title>Drafts</title>
      </head>
      <div>
        <div className="flex flex-col items-center justify-center gap-8 px-8 py-32 text-2xl font-semibold md:hidden">
          <Image src="/images/error.png" height={200} width={200} alt="Reponsive Error" />
          <p className="">Unfortunately Mixim Drafts is not Mobile Responsive.</p>
          <p className="">We recommend using Big Screens(Tablet, Laptop or Desktop) for Better Experience.</p>
        </div>
        <div></div>
      </div>

      {!hasSeenWhatsNewModal() && <WhatsNewModal />}

      <motion.div layout className="hidden h-screen gap-4 bg-base-hover p-4 md:flex">
        <NoteSidebar />
        <NoteEditor />
      </motion.div>
      <Oasis />
    </div>
  )
}
