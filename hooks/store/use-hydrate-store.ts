import { useEffect, useState } from "react";
import { StoreApi, UseBoundStore } from "zustand";

export const useHydratedStore = <T, F>(
  store: UseBoundStore<StoreApi<T>>,
  selector: (state: T) => F
) => {
  const [hydratedState, setHydratedState] = useState<F | undefined>(undefined);

  useEffect(() => {
    setHydratedState(selector(store.getState()));
  }, [store, selector]);
  return hydratedState;
};
