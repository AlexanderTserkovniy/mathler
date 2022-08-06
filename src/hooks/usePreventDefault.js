import { useCallback } from "react";

/**
 * Created by Oleksandr Tserkovnyi on 06.08.2022.
 * kemperomg@gmail.com
 */

export const usePreventDefault = (eventHandler) => {
  const viaPreventDefault = useCallback(
    (e) => {
      e.preventDefault();
      eventHandler();
    },
    [eventHandler]
  );

  return viaPreventDefault;
};
