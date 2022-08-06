/*
 * This reducer checks if the persisted local storage object and the initial
 * state object have the same keys. If they don't have the same keys, then the
 * reducer will re-initialize with the initial state. This makes it so that new
 * initial state keys can be added down the road, and users' persisted reducers
 * will not blindly keep using the local storage.
 *
 * This comes with a caveat, though, that contexts that use persisted reducers
 * have to stick with whatever keys are "declared" in the initial state. They
 * cannot dynamically add or remove keys from top-level reducer state.
 */
import { useEffect, useReducer } from "react";
import { doObjectsHaveSameKeys } from "../common/js/utils";

// 259200000 is 3 days
export function usePersistedReducer(
  reducer,
  key,
  initialState,
  timeToLiveMs = 259200000
) {
  const persistedValue =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem(key))
      : null;
  const isExpired =
    persistedValue?.timeStamp &&
    new Date().getTime() - persistedValue.timeStamp > timeToLiveMs;

  const [state, dispatch] = useReducer(
    reducer,
    !persistedValue ||
      !persistedValue?.timeStamp ||
      isExpired ||
      !doObjectsHaveSameKeys(
        { ...initialState, timeStamp: null },
        persistedValue
      )
      ? { ...initialState, timeStamp: new Date().getTime() }
      : persistedValue
  );

  useEffect(() => {
    typeof window !== "undefined" &&
      localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, dispatch];
}
