"use client";

import React, { useEffect } from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { enableReactUse } from "@legendapp/state/config/enableReactUse";

enableReactUse();
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 60 * 24,
      refetchOnWindowFocus: false,
    },
  },
});

import {
  configureObservablePersistence,
  persistObservable,
} from "@legendapp/state/persist";
// Web
import { ObservablePersistIndexedDB } from "@legendapp/state/persist-plugins/indexeddb";
import { state } from "@/services/state";
import { when } from "@legendapp/state";

// Global configuration
const a = configureObservablePersistence({
  persistLocal: ObservablePersistIndexedDB,
  persistLocalOptions: {
    indexedDB: {
      databaseName: "Notes",
      version: 1,
      tableNames: ["filesystem", "selectedFileId", "test"],
    },
  },
});

function Providers({ children }: React.PropsWithChildren) {
  const [client] = React.useState(queryClient);

  return (
    <QueryClientProvider client={client}>
      <Hydrate>{children}</Hydrate>
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  );
}

export default Providers;
