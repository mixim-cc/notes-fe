import createIdbStorage from "@piotr-cz/redux-persist-idb-storage"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux"
import { persistReducer } from "redux-persist"
import defaultStorage from "redux-persist/lib/storage"

import syncMiddleware from "./middleware/api-sync"
import fileExplorerReducer from "./reducers/file-explorer-reducer"

const persistConfig = {
  key: "root",
  storage: globalThis.indexedDB
    ? createIdbStorage({ name: "notes", storeName: "file-explorer" })
    : defaultStorage,
  serialize: false,
  deserialize: false,
}

const persistedReducer = persistReducer(persistConfig, fileExplorerReducer)

const rootReducer = combineReducers({ fileExplorerReducer: persistedReducer })
export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({
  reducer: rootReducer,
  middleware: [syncMiddleware],
})

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
