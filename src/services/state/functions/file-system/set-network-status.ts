import { state } from "../..";
import { startImmediateSync } from "../sync";

export const setNetworkStatus = ({
  status,
}: {
  status: "offline" | "online";
}) => {
  state.networkStatus.set(status);
  if (status === "online") {
    startImmediateSync();
  }
};
