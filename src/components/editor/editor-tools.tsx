"use client"

import Router from "next/router"
import AttachesTool from "@editorjs/attaches"
import Checklist from "@editorjs/checklist"
import Code from "@editorjs/code"
import Delimiter from "@editorjs/delimiter"
import { ToolConfig } from "@editorjs/editorjs"
import Embed from "@editorjs/embed"
import Header from "@editorjs/header"
import Image from "@editorjs/image"
import InlineCode from "@editorjs/inline-code"
import LinkTool from "@editorjs/link"
import Marker from "@editorjs/marker"
import NestedList from "@editorjs/nested-list"
import Paragraph from "@editorjs/paragraph"
import Quote from "@editorjs/quote"
import Raw from "@editorjs/raw"
import Table from "@editorjs/table"
import Warning from "@editorjs/warning"
import axios from "axios"
import Cookie from "js-cookie"

export const EDITOR_TOOLS: ToolConfig = {
  code: Code,
  warning: {
    class: Warning,
    inlineToolbar: true,
    shortcut: "CMD+SHIFT+W",

    config: {
      titlePlaceholder: "Title",
      messagePlaceholder: "Message",
    },
  },
  header: {
    class: Header,
    inlineToolbar: true,
    defaultLevel: 3,
    defaultAlignment: "left",
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
  },
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  delimiter: Delimiter,
  list: {
    class: NestedList,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
  },
  checklist: {
    class: Checklist,
    inlineToolbar: true,
  },
  raw: Raw,
  // nestedCheckList: editorjsNestedChecklist,
  image: {
    class: Image,
    inlineToolbar: true,
    config: {
      uploader: {
        uploadByFile(file: File) {
          return new Promise(async (resolve) => {
            const formData = new FormData()
            formData.append("file", file)
            const response = await axios.put(
              `${process.env["NEXT_PUBLIC_API_URL"]}/file/01GZTJFBMB91JT6CTXKH3JZNW1`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${Cookie.get("__session")}`,
                },
              }
            )

            console.log(response.data)

            resolve({
              success: 1,
              file: {
                url: response.data,
              },
            })
          })
        },
        uploadByUrl(url: string) {
          return new Promise((resolve) => {
            resolve({
              success: 1,
              file: {
                url,
              },
            })
          })
        },
      },
    },
  },
  linkTool: {
    class: LinkTool,
  },
  attaches: {
    class: AttachesTool,
    config: {
      uploader: {
        uploadByFile(file: File) {
          return new Promise(async (resolve) => {
            try {
              const formData = new FormData()
              formData.append("file", file)
              const response = await axios.put(
                `${process.env["NEXT_PUBLIC_API_URL"]}/file/${Router.query["id"]}`,
                formData
              )

              if (response.data) {
                resolve({
                  success: 1,
                  file: {
                    url: response.data,
                  },
                })
              }
            } catch (e) {
              resolve({
                success: 0,
              })
            }
          })
        },
        uploadByUrl(url: string) {
          return new Promise((resolve) => {
            resolve({
              success: 1,
              file: {
                url,
              },
            })
          })
        },
      },
    },
  },
  embed: {
    class: Embed,
    config: {
      services: {
        youtube: true,
      },
    },
  },
  table: {
    class: Table,
    inlineToolbar: true,
  },
  inlineCode: {
    class: InlineCode,
    shortcut: "CMD+SHIFT+C",
  },
  marker: {
    class: Marker,
    shortcut: "CMD+SHIFT+M",
  },
}
