import { state } from "../..";

export const toggleSidebar = (value: boolean) => {
  state.isSidebarVisible.set((prev) => !prev);
};
