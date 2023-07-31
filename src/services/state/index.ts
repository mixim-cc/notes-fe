import { OutputData } from "@editorjs/editorjs";
import { observable } from "@legendapp/state";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";

export type NoteType = "FILE" | "FOLDER";

export type FileSystem = {
  id: string;
  title: string;
  parentId: string;
  type: NoteType;
  synced_parent_id?: string;
  synced_id?: string;
  synced?: boolean;
  content?: OutputData | null;
  isJournal?: boolean;
  isPublic?: boolean;

  depth?: number;
  open?: boolean;
};

export type State = {
  startSync: boolean;
  isSidebarVisible: boolean;
  fs: {
    fileSystem: FileSystem[];
    selectedFileId: string | undefined;
  };
};

export const initialState = {
  fs: {
    fileSystem: [],
    selectedFileId: undefined,
  },
  isSidebarVisible: true,
  startSync: false,
};

export const state = observable<State>(initialState);

persistObservable(state.isSidebarVisible, {
  local: "sidebar",
  persistLocal: ObservablePersistLocalStorage,
});
