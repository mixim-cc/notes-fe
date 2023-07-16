/* eslint-disable @next/next/no-img-element */
"use client"

import { get } from "http"
import { useEffect, useState } from "react"
import { useGetNoteFolderStructureQuery } from "@/services/graphql/generated/graphql"
import {
  addNewFile,
  addNewFolder,
  clear,
  setSelectedFile,
  setSelectedFileWithSyncedId,
  triggerSync,
} from "@/services/redux/reducers/file-explorer-reducer"
import { cn } from "@/utils/cn"
import { SignOutButton, SignedIn, UserButton, useUser } from "@clerk/nextjs"
import dayjs from "dayjs"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, FileText, LogOut, Plus, Search, User } from "lucide-react"
import { useHotkeys } from "react-hotkeys-hook"
import { useDispatch } from "react-redux"

import { ThemeToggle } from "../theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { Button } from "./button"
import { IconButton } from "./icon-button"
import { Input } from "./input"

type OasisMenu = "none" | "menu" | "add" | "search" | "avatar"

const searchItems = [
  {
    id: 1,
    title: "Stop using todo list",
    description: "todo list i graveyard...",
  },
]

export const Oasis = () => {
  const dispatch = useDispatch()
  const { user } = useUser()

  const [searchTerm, setSearchTerm] = useState("")
  const [currentMenu, setCurrentMenu] = useState<OasisMenu>("menu")
  const [currentTime, setCurrentTime] = useState(dayjs())

  const { data } = useGetNoteFolderStructureQuery({ search: searchTerm }, { enabled: !!searchTerm })

  const flatStrucuture = data?.note?.listAll?.reduce((output, item) => {
    const newItem = {
      id: item.id,
      title: item.title,
      type: item.type,
    }

    output.push(newItem)

    if (item.children && item.children.length > 0) {
      const children = item.children.map((child) => ({
        id: child?.id,
        title: child.title,
        parentId: item.id,
        type: child.type,
      }))

      output.push(...children)
    }

    return output
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs())
    }, 60000) // Update every minute (60,000 milliseconds)

    return () => {
      clearInterval(interval)
    }
  }, [])

  useHotkeys("alt + 0", () => setCurrentMenu("none"), [currentMenu], { enableOnContentEditable: true })
  useHotkeys("alt + 1", () => setCurrentMenu("add"), [currentMenu], { enableOnContentEditable: true })
  useHotkeys("alt + s", () => setCurrentMenu("search"), [currentMenu], { enableOnContentEditable: true })
  useHotkeys("alt + q", () => setCurrentMenu("avatar"), [currentMenu], { enableOnContentEditable: true })

  if (!user) {
    return null
  }

  return (
    <div className="absolute bottom-[52px] left-[50%] z-20 translate-x-[-50%]">
      <motion.div
        layout
        className="z-20 flex max-w-[670px] flex-col gap-4 rounded-2xl bg-base p-3 shadow-2xl dark:border dark:border-stroke-base"
      >
        {searchTerm && currentMenu === "search" && (
          <motion.div
            animate={{
              scale: [1, 1, 1, 1, 1],
            }}
            transition={{
              layout: { duration: 0.3 },
            }}
            className="flex cursor-pointer flex-col gap-2"
          >
            {flatStrucuture
              ?.filter?.((f) => f.type === "FILE")
              ?.map((searchItem) => (
                <div
                  key={searchItem.id}
                  className="flex gap-2 rounded-md p-2 hover:bg-base-hover "
                  onClick={() => {
                    dispatch(setSelectedFileWithSyncedId({ id: searchItem?.id }))
                    setCurrentMenu("menu")
                    setSearchTerm("")
                  }}
                >
                  <FileText className="h-4 w-4" />
                  <div className="">
                    <p className="text-xs text-shade-primary">{searchItem.title}</p>
                    {/* <p className="text-sm text-shade-primary">{searchItem.description}</p> */}
                  </div>
                </div>
              ))}

            <div
              className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-base-hover"
              onClick={() => {
                dispatch(addNewFile({ parentId: null, title: searchTerm }))
                dispatch(triggerSync())
                setCurrentMenu("menu")
                setSearchTerm("")
              }}
            >
              <IconButton size="xs" variant="outline">
                <Plus className="h-3 w-3 text-shade-secondary" />
              </IconButton>
              <p className="text-sm text-shade-primary">
                Create new Draft with title &quot;{searchTerm}&quot;
              </p>
            </div>
          </motion.div>
        )}

        {currentMenu === "avatar" && (
          <motion.div
            animate={{
              scale: [1, 1, 1, 1, 1],
            }}
            transition={{
              layout: { duration: 0.3 },
            }}
            className="flex cursor-pointer flex-col gap-4 pb-6"
          >
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-shade-secondary">My Profile</p>

              <div className="flex items-center gap-2 rounded-lg bg-back p-2">
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user.imageUrl} />
                </Avatar>
                <div className="flex flex-col ">
                  <p className="font-medium text-shade-secondary">{user.fullName}</p>
                  <p className="text-sm font-medium text-shade-subtle">
                    {user.primaryEmailAddress.emailAddress}
                  </p>
                </div>
              </div>
            </div>
            <SignOutButton signOutCallback={async () => dispatch(clear())}>
              <Button
                className="border border-red-300 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 dark:border-back dark:bg-red-700 dark:text-red-200"
                variant="outline"
                leftIcon={<LogOut className="h-4 w-4" />}
              >
                Log Out
              </Button>
            </SignOutButton>
          </motion.div>
        )}

        <motion.div layout className={"flex h-10 items-center justify-center gap-10 p-1"}>
          <motion.div
            layout
            className={cn("flex shrink-0 items-center justify-center gap-4", {
              "gap-10": currentMenu === "none",
            })}
          >
            <motion.div
              layout
              className="group relative flex cursor-pointer items-center"
              onClick={() => {
                setCurrentMenu((prev) => {
                  if (prev === "menu") {
                    return "none"
                  }
                  return "menu"
                })
              }}
            >
              {currentMenu === "none" ? (
                <div className="flex items-center">
                  <ChevronLeft className="absolute -left-4 hidden h-4 w-4 animate-pulse text-shade-secondary group-hover:block" />
                  <motion.div animate={{ rotate: [0, 90] }}>
                    <img
                      src="/images/logo-dark.svg"
                      alt="logo"
                      className="hidden h-10 w-10 object-contain dark:block"
                    />
                    <img src="/images/logo.svg" alt="logo" className="h-10 w-10 object-contain dark:hidden" />
                  </motion.div>
                </div>
              ) : (
                <div className="flex items-center">
                  <motion.div animate={{ rotate: [90, 0] }} className="flex items-center">
                    <img
                      src="/images/logo-dark.svg"
                      alt="logo"
                      className="hidden h-10 w-10 object-contain dark:block"
                    />
                    <img src="/images/logo.svg" alt="logo" className="h-10 w-10 object-contain dark:hidden" />
                  </motion.div>
                  <ChevronRight className="absolute -right-4 hidden h-4 w-4 animate-pulse text-shade-secondary group-hover:block" />
                </div>
              )}
            </motion.div>
            {currentMenu === "none" && (
              <motion.div layout className="flex flex-col">
                <div className="text-xs font-normal text-shade-secondary">
                  {getGreeting(currentTime.toDate())}, {user.firstName}
                </div>
                <div className="text-lg font-medium text-shade-primary">
                  It&apos;s {currentTime.format("hh:mm A")}
                </div>
              </motion.div>
            )}
          </motion.div>

          {(currentMenu === "menu" || currentMenu === "avatar") && (
            <motion.div layout className="flex items-center justify-center gap-2">
              <IconButton variant="outline" size="lg" onClick={() => setCurrentMenu("add")}>
                <Plus className="h-5 w-5" />
              </IconButton>
              <IconButton variant="outline" size="lg" onClick={() => setCurrentMenu("search")}>
                <Search className="h-5 w-5" />
              </IconButton>

              <ThemeToggle />
            </motion.div>
          )}

          {currentMenu === "add" && (
            <motion.div
              animate={{
                scale: [1, 1, 1, 1, 1],
              }}
              transition={{
                layout: { duration: 0.3 },
              }}
              className="flex items-center justify-center gap-4"
            >
              <Button
                variant="outline"
                leftIcon={<Plus className="h-4 w-4" />}
                onClick={() => {
                  dispatch(addNewFile({ parentId: null, title: "Untitled" }))
                  dispatch(triggerSync())
                }}
              >
                New Draft
              </Button>
              <Button
                variant="outline"
                leftIcon={<Plus className="h-4 w-4" />}
                onClick={() => {
                  dispatch(addNewFolder({ parentId: null, title: "Untitled" }))
                  dispatch(triggerSync())
                }}
              >
                New Folder
              </Button>
            </motion.div>
          )}

          {currentMenu === "search" && (
            <motion.div className="w-[1000px]">
              <Input
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search className="h-5 w-5" />}
                type="search"
                placeholder="What are you searching for? Try writing it"
              />
            </motion.div>
          )}

          <motion.div layout>
            <Avatar
              className="cursor-pointer"
              onClick={() => setCurrentMenu((prev) => (prev === "avatar" ? "none" : "avatar"))}
            >
              <AvatarImage src={user.imageUrl} />
            </Avatar>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

const getGreeting = (currentTime: Date) => {
  if (currentTime.getHours() < 12) {
    return "Good Morning"
  } else if (currentTime.getHours() < 18) {
    return "Good Afternoon"
  } else {
    return "Good Evening"
  }
}
