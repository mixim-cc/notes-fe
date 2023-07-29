import { debounce } from "lodash";
import { state } from "../..";

export const startSync = debounce(() => {
  return state.startSync.set(true);
}, 1000);

export const startImmediateSync = () => {
  return state.startSync.set(true);
};
