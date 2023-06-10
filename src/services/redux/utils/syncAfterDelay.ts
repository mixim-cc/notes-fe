import debounce from "lodash/debounce"

import { triggerSync } from "../reducers/file-explorer-reducer"
import { store } from "../store"

export const syncAfterDelay = debounce(() => {
  store.dispatch(triggerSync())
}, 1000)
