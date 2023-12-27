/* eslint-disable @next/next/no-img-element */
"use client";

import { get } from "http";
import { useEffect, useState } from "react";
// import { useGetNoteFolderStructureQuery } from "@/services/graphql/generated/graphql"
// import {
//   addNewFile,
//   addNewFolder,
//   clear,
//   setSelectedFile,
//   setSelectedFileWithSyncedId,
//   triggerSync,
// } from "@/services/redux/reducers/file-explorer-reducer"
import { cn } from "@/utils/cn";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Keyboard,
  LogOut,
  Plus,
  Search,
  Sparkles,
  User,
} from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";

import { ThemeToggle } from "../theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import { IconButton } from "./icon-button";
import { Input } from "./input";
import { clear } from "@/services/state/functions/file-system/clear";
import { useSelector } from "@legendapp/state/react";
import { state } from "@/services/state";
import { selectFile } from "@/services/state/functions/file-system/select-file";
import { addNew } from "@/services/state/functions/file-system/add-new";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Badge } from "./badge";

type OasisMenu = "none" | "menu" | "add" | "search" | "avatar" | "keyboard";

export const Oasis = () => {
  const { user } = useUser();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentMenu, setCurrentMenu] = useState<OasisMenu>("menu");
  const [currentTime, setCurrentTime] = useState(dayjs());

  const fileSystem = useSelector(state.fs.fileSystem);

  const searchItems = fileSystem.filter((obj) => {
    if (obj?.type === "FILE") {
      const blocks = obj?.content?.blocks;
      if (blocks) {
        for (const block of blocks) {
          if (block?.data?.text?.includes(searchTerm)) {
            return true; // If any block contains the search word, include the object in the result
          }
        }
      }
    }

    return (
      obj?.type === "FILE" &&
      obj.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 60000); // Update every minute (60,000 milliseconds)

    return () => {
      clearInterval(interval);
    };
  }, []);

  useHotkeys(["alt + H"], () => setCurrentMenu("none"), [currentMenu], {
    enabled: true,
    enableOnContentEditable: true,
    enableOnFormTags: true,
    preventDefault: true,
  });
  useHotkeys("alt + N", () => setCurrentMenu("add"), [currentMenu], {
    enabled: true,
    enableOnContentEditable: true,
    enableOnFormTags: true,
    preventDefault: true,
  });
  useHotkeys("alt + k", () => setCurrentMenu("keyboard"), [currentMenu], {
    enabled: true,
    enableOnContentEditable: true,
    enableOnFormTags: true,
    preventDefault: true,
  });
  useHotkeys("alt + s", () => setCurrentMenu("search"), [currentMenu], {
    enabled: true,
    enableOnContentEditable: true,
    enableOnFormTags: true,
    preventDefault: true,
  });
  useHotkeys("alt + t", () => setCurrentMenu("menu"), [currentMenu], {
    enabled: true,
    enableOnContentEditable: true,
    enableOnFormTags: true,
    preventDefault: true,
  });
  useHotkeys("alt + p", () => setCurrentMenu("avatar"), [currentMenu], {
    enabled: true,
    enableOnContentEditable: true,
    enableOnFormTags: true,
    preventDefault: true,
  });

  if (!user) {
    return null;
  }

  return (
    <div className="absolute bottom-[52px] left-[50%] z-20 translate-x-[-50%]">
      <motion.div
        layout
        className="z-20 flex w-auto max-w-[670px] flex-col gap-4 rounded-full bg-base p-3 shadow-2xl dark:border dark:border-stroke-base"
      >
        {searchTerm && currentMenu === "search" && (
          <motion.div
            transition={{
              layout: { duration: 0.3 },
              ease: "easeOut",
            }}
            className="flex flex-col gap-2 cursor-pointer"
          >
            {searchItems?.map((searchItem) => (
              <div
                key={searchItem?.id}
                className="flex gap-2 p-2 rounded-md hover:bg-base-hover "
                onClick={() => {
                  selectFile({ id: String(searchItem?.id) });
                  setCurrentMenu("menu");
                  setSearchTerm("");
                }}
              >
                <FileText className="w-4 h-4" />
                <div className="">
                  <p className="text-xs text-shade-primary">
                    {searchItem?.title}
                  </p>
                  <p className="text-sm text-shade-primary">
                    {searchItem?.content?.blocks
                      ?.filter((f) =>
                        f?.data?.text?.toLowerCase().includes(searchTerm)
                      )
                      .map((a, index) => (
                        <p key={index}>{a.data.text}</p>
                      ))}
                  </p>
                </div>
              </div>
            ))}

            <div
              className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-base-hover"
              onClick={() => {
                const id = addNew({
                  parentId: "",
                  title: searchTerm,
                  type: "FILE",
                  depth: 0,
                });
                selectFile(id);

                setCurrentMenu("menu");
                setSearchTerm("");
              }}
            >
              <IconButton size="xs" variant="outline">
                <Plus className="w-3 h-3 text-shade-secondary" />
              </IconButton>
              <p className="text-sm text-shade-primary">
                Create new Note with title &quot;{searchTerm}&quot;
              </p>
            </div>
          </motion.div>
        )}

        <motion.div
          layout
          className={"flex h-10 items-center justify-center gap-8 p-1"}
        >
          <motion.div
            layout
            className={cn("flex shrink-0 items-center justify-center gap-4", {
              "gap-8": currentMenu === "none",
            })}
          >
            <motion.div
              layout
              className="relative flex items-center cursor-pointer group"
              onClick={() => {
                setCurrentMenu((prev) => {
                  if (prev === "menu") {
                    return "none";
                  }
                  return "menu";
                });
              }}
            >
              {currentMenu === "none" ? (
                <div className="flex items-center">
                  <ChevronLeft className="absolute hidden w-4 h-4 -left-4 animate-pulse text-shade-secondary group-hover:block" />
                  <motion.div animate={{ rotate: [0, 90] }}>
                    <img
                      src="/images/logo-dark.svg"
                      alt="logo"
                      className="hidden object-contain w-10 h-8 dark:block"
                    />
                    <img
                      src="/images/logo.svg"
                      alt="logo"
                      className="object-contain w-10 h-8 dark:hidden"
                    />
                  </motion.div>
                </div>
              ) : (
                <div className="flex items-center">
                  <motion.div
                    animate={{ rotate: [90, 0] }}
                    className="flex items-center"
                  >
                    <img
                      src="/images/logo-dark.svg"
                      alt="logo"
                      className="hidden object-contain w-8 h-8 dark:block"
                    />
                    <img
                      src="/images/logo.svg"
                      alt="logo"
                      className="object-contain w-8 h-8 dark:hidden"
                    />
                  </motion.div>
                  <ChevronRight className="absolute hidden w-4 h-4 -right-4 animate-pulse text-shade-secondary group-hover:block" />
                </div>
              )}
            </motion.div>
            {currentMenu === "none" && (
              <motion.div layout className="flex flex-col text-center">
                <div className="text-xs font-medium tracking-wide text-shade-secondary">
                  {getGreeting(currentTime.toDate())}, {user.firstName}
                </div>
                <div className="text-lg font-medium text-shade-primary">
                  It&apos;s {currentTime.format("hh:mm A")}
                </div>
              </motion.div>
            )}
          </motion.div>

          {(currentMenu === "menu" || currentMenu === "avatar") && (
            <motion.div
              layout
              className="flex items-center justify-center gap-2"
            >
              <IconButton
                variant="outline"
                size="lg"
                onClick={() => setCurrentMenu("add")}
              >
                <Plus className="w-5 h-5" />
              </IconButton>
              <IconButton
                variant="outline"
                size="lg"
                onClick={() => setCurrentMenu("search")}
              >
                <Search className="w-5 h-5" />
              </IconButton>

              <ThemeToggle />

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center px-2">
                    <Keyboard size={20} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md mx-auto border-none dark:bg-base-hover bg-base">
                  <DialogHeader>
                    <DialogTitle>Keyboard Shortcuts</DialogTitle>
                    <DialogDescription>
                      Learn the keyboard shortcuts to enhance your productivity.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">Toggle Sidebar</p>
                        <Badge className="ml-auto dark:bg-front-hover">
                          M, ALT + M
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">Home</p>
                        <Badge className="ml-auto dark:bg-front-hover">
                          ALT + H
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">Search</p>
                        <Badge className="ml-auto dark:bg-front-hover">
                          ALT + S
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">Toggle Theme</p>
                        <Badge className="ml-auto dark:bg-front-hover">
                          ALT + T
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">Toggle Theme</p>
                        <Badge className="ml-auto dark:bg-front-hover">
                          ALT + T
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">Profile</p>
                        <Badge className="ml-auto dark:bg-front-hover">
                          ALT + P
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">Search</p>
                        <Badge className="ml-auto dark:bg-front-hover">
                          Ctrl + F
                        </Badge>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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
                leftIcon={<Plus className="w-4 h-4" />}
                onClick={() => {
                  addNew({
                    title: "Untitled Note",
                    parentId: "",
                    type: "FILE",
                    depth: 0,
                  });
                }}
              >
                New Note
              </Button>
              <Button
                variant="outline"
                leftIcon={<Plus className="w-4 h-4" />}
                onClick={() => {
                  addNew({
                    title: "Untitled Folder",
                    parentId: "",
                    type: "FOLDER",
                    depth: 0,
                  });
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
                leftIcon={<Search className="w-5 h-5" />}
                type="search"
                placeholder="What are you searching for? Try writing it"
              />
            </motion.div>
          )}

          <motion.div layout>
            <UserButton afterSignOutUrl="/" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const getGreeting = (currentTime: Date) => {
  if (currentTime.getHours() < 12) {
    return "Good Morning";
  } else if (currentTime.getHours() < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};
