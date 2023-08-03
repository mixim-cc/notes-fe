import { NoteType, useGetStructureRootQuery } from "@/services/graphql";
import { state } from "@/services/state";
import { when } from "@legendapp/state";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistIndexedDB } from "@legendapp/state/persist-plugins/indexeddb";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";

import { useObserve, useSelector } from "@legendapp/state/react";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

export const useInitalLoad = () => {
  const [isLocalLoaded, setIsLocalLoaded] = useState(false);
  const fs = useSelector(state.fs.fileSystem);

  const { data: rootData, isLoading } = useGetStructureRootQuery();

  const rootFolders = rootData?.note?.listAll?.filter((f) => !f?.parentId);

  useEffect(() => {
    if (rootFolders && !fs.length) {
      state.fs.fileSystem.set(
        rootFolders.map((n, index) => ({
          id: nanoid(),
          title: String(n?.title),
          parentId: n?.parentId ? n?.parentId : "",
          type: n?.type as NoteType,
          synced_parent_id: "",
          synced_id: String(n?.id),
          synced: true,
          isJournal: n?.title === "Journal",
          depth: 0,
          isSyncing: false,
          lastSyncedDate: new Date(),
          open: index === 0 ? true : false,
          isPublic: n?.isPublic || false,
        })) || []
      );
    }
  }, [isLoading]);

  useEffect(() => {
    const local = persistObservable(state, {
      local: "filesystem",
      persistLocal: ObservablePersistIndexedDB,
    });

    const load = async () => {
      const res = await when(local.isLoadedLocal);
      if (res) {
        setIsLocalLoaded(true);
      }
    };

    load();
  }, []);

  return { isLoading, isLocalLoaded };
};
