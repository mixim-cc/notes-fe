import { OutputData } from "@editorjs/editorjs"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { nanoid } from "nanoid"

export type FileStructure = {
  id: string
  title: string
  parentId: string | null
  type: "FOLDER" | "FILE"
  content: OutputData | null
  synced: boolean
  synced_id: string | null
}

interface FileExplorerState {
  structure: FileStructure[]

  selectedFile: string | null
  isSidebarVisible: boolean
}

const initialState: FileExplorerState = {
  structure: [],
  selectedFile: null,
  isSidebarVisible: true,
}

export const fileExplorerSlice = createSlice({
  name: "file-explorer",
  initialState,
  reducers: {
    toggleSidebarVisibility: (state) => {
      state.isSidebarVisible = !state.isSidebarVisible
    },

    triggerSync: (state) => {},

    updateEntireTree: (state, action: PayloadAction<{ structure: FileStructure[] }>) => {
      state.structure = action.payload.structure
    },

    addNewFile: (state, action: PayloadAction<{ title: string; parentId: string | null }>) => {
      const { parentId, title } = action.payload

      state.structure = [
        ...state.structure,
        {
          id: nanoid(),
          title,
          parentId,
          type: "FILE",
          content: null,
          synced: false,
          synced_id: null,
        },
      ]
    },
    addNewFolder: (state, action: PayloadAction<{ title: string; parentId: string | null }>) => {
      const { parentId, title } = action.payload

      state.structure = [
        ...state.structure,
        {
          id: nanoid(),
          title,
          parentId,
          type: "FOLDER",
          content: null,
          synced: false,
          synced_id: null,
        },
      ]
    },

    editFile: (state, action: PayloadAction<Partial<FileStructure>>) => {
      state.structure = state.structure.map((obj) => {
        if (obj.id === action.payload.id) {
          return { ...obj, ...action.payload, synced: false }
        }
        return obj
      })
    },

    deleteFile: (state, action: PayloadAction<{ id: string; parentId?: string }>) => {
      state.structure = state.structure.filter((obj) => obj.id !== action.payload.id)
      if (action.payload.parentId) {
        const files = state.structure.filter((obj) => obj.parentId === action.payload.parentId)
        state.selectedFile = files.length ? files[0].id : null
      } else {
        const files = state.structure.filter((obj) => obj.type === "FILE" && !obj.parentId)
        state.selectedFile = files[0].id
      }
    },

    deleteFolder: (state, action: PayloadAction<{ id: string }>) => {
      const files = state.structure.filter((obj) => obj.parentId === action.payload.id)

      if (files.length !== 0) {
        alert("Delete all files before deleting a folder.")
        return
      }

      state.structure = state.structure.filter((obj) => obj.id !== action.payload.id)
      state.selectedFile = files.length ? files[0].id : null
    },

    copyFile: (state, action: PayloadAction<Partial<FileStructure>>) => {
      const newId = nanoid()
      const foundFile = state.structure.find((obj) => obj.id === action.payload.id)

      if (foundFile) {
        state.structure = [...state.structure, { ...foundFile, id: newId, synced: false }]
        state.selectedFile = newId
      }
    },

    editFileTitle: (state, action: PayloadAction<{ title: string; id: string }>) => {
      const { id, title } = action.payload

      state.structure = state.structure.map((obj) => {
        if (obj.id === id) {
          return { ...obj, title, synced: false }
        }
        return obj
      })
    },

    setSelectedFile: (state, action: PayloadAction<{ id: string | null }>) => {
      state.selectedFile = action.payload.id
    },

    addFileContent: (state, action: PayloadAction<{ id: string; content: OutputData }>) => {
      const { id, content } = action.payload

      state.structure = state.structure.map((obj) => {
        if (obj.id === id) {
          return { ...obj, content, synced: false }
        }
        return obj
      })
    },
  },
})

export const {
  addNewFile,
  addNewFolder,
  editFileTitle,
  updateEntireTree,
  triggerSync,
  editFile,
  setSelectedFile,
  addFileContent,
  toggleSidebarVisibility,
  deleteFolder,
  deleteFile,
  copyFile,
} = fileExplorerSlice.actions

export default fileExplorerSlice.reducer
