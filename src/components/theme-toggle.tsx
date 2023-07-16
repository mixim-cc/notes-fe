"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { set } from "react-hook-form"
import { useHotkeys } from "react-hotkeys-hook"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

import { IconButton } from "./ui/icon-button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  // useHotkeys("alt + t", () => setTheme(theme === "light" ? "dark" : "light"), {
  //   enabled: true,
  //   enableOnContentEditable: true,
  //   enableOnFormTags: true,
  //   preventDefault: true,
  // })

  return (
    <IconButton variant="outline" size="lg" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      <Icons.sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Icons.moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </IconButton>
  )
}
