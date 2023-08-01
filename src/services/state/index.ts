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
  isSyncing?: boolean;

  depth?: number;
  open?: boolean;
  lastSyncedDate?: Date;
};

export type State = {
  startSync: boolean;
  isSidebarVisible: boolean;
  networkStatus: "online" | "offline";

  fs: {
    deletedIds: string[];
    fileSystem: FileSystem[];
    selectedFileId: string | undefined;
  };
};

export const initialState: State = {
  fs: {
    fileSystem: [],
    selectedFileId: undefined,
    deletedIds: [],
  },
  isSidebarVisible: true,
  networkStatus: "online",
  startSync: false,
};

export const state = observable<State>(initialState);

persistObservable(state.isSidebarVisible, {
  local: "sidebar",
  persistLocal: ObservablePersistLocalStorage,
});

persistObservable(state.networkStatus, {
  local: "networkStatus",
  persistLocal: ObservablePersistLocalStorage,
});
