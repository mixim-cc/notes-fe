"use client"

import React from "react"
import { store } from "@/services/redux/store"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Provider } from "react-redux"
import { persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"

const persister = persistStore(store)
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 0 },
  },
})

function Providers({ children }: React.PropsWithChildren) {
  const [client] = React.useState(queryClient)

  return (
    <QueryClientProvider client={client}>
      <GoogleOAuthProvider clientId="482628090719-gcv02c5cpjo0gj6jqkbq3paau6jn7638.apps.googleusercontent.com">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persister}>
            <Hydrate>{children}</Hydrate>
          </PersistGate>
        </Provider>

        <ReactQueryDevtools initialIsOpen={false} />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  )
}

export default Providers
