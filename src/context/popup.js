/**
 * Created by Oleksandr Tserkovnyi on 06.08.2022.
 * kemperomg@gmail.com
 */

import React, { useCallback, useReducer } from "react";

const PopupContext = React.createContext();

const defaultState = {
  /*
    header: null,
    content: null
  * */
  value: null,
};

const sideEffects = {};

function popupReducer(state, action) {
  switch (action.type) {
    case "setPopupContent":
      return {
        ...state,
        value: action.payload,
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function PopupProvider({ children }) {
  const [state, dispatch] = useReducer(popupReducer, defaultState);

  // action dispatchers
  const setPopupContent = useCallback(
    (payload) => {
      dispatch({
        type: "setPopupContent",
        payload,
      });
    },
    [dispatch]
  );

  const actions = {
    setPopupContent,
  };

  const value = { actions, sideEffects, state };

  return (
    <PopupContext.Provider value={value}>{children}</PopupContext.Provider>
  );
}

function usePopup() {
  const context = React.useContext(PopupContext);
  if (context === undefined) {
    throw new Error("usePopup must be used within a PopupProvider");
  }
  return context;
}

export { PopupProvider, usePopup };
