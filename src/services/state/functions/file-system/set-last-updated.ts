import { state } from "../..";
import { startImmediateSync } from "../sync";

export const setLastUpdated = ({ date, id }: { date: Date; id: string }) => {
  state.fs.fileSystem.set((prev) =>
    prev.map((p) =>
      p.id === id
        ? {
            ...p,
            lastSyncedDate: date,
          }
        : p
    )
  );
};
