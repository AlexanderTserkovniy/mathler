/**
 * Created by Oleksandr Tserkovnyi on 06.08.2022.
 * kemperomg@gmail.com
 */

import React, { useCallback } from "react";
import { THEME } from "../common/js/constants";
import { usePersistedReducer } from "./usePersistedReducer";

const ThemeContext = React.createContext();

const defaultState = {
  value: THEME.dark,
};

const sideEffects = {
  addBodyClasses(classes) {
    document.body.classList.add(classes);
  },

  changeBodyClasses(classesToReplace, newClasses) {
    document.body.classList.remove(classesToReplace);
    document.body.classList.add(newClasses);
  },
};

function themeReducer(state, action) {
  switch (action.type) {
    case "toggle":
      return {
        ...state,
        value: action.payload,
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function ThemeProvider({ children }) {
  const [state, dispatch] = usePersistedReducer(
    themeReducer,
    THEME.key,
    defaultState
  );

  // action dispatchers
  const toggleTheme = useCallback(
    (theme) => {
      dispatch({
        type: "toggle",
        payload: theme,
      });
      sideEffects.changeBodyClasses(state.value, theme);
    },
    [dispatch, state.value]
  );

  const actions = {
    toggleTheme,
  };

  const value = { actions, sideEffects, state };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export { ThemeProvider, useTheme };
