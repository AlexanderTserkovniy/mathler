/**
 * Created by Oleksandr Tserkovnyi on 06.08.2022.
 * kemperomg@gmail.com
 */

import React, { useCallback } from "react";
import { usePersistedReducer } from "./usePersistedReducer";
import equations from "../config/equations";
import rules from "../config/rules";
import normalize from "../services/calculate/normalize";

const LOCAL_STORAGE_KEY = "game";

const GameContext = React.createContext();

const defaultDifficulty = "normal";
const defaultState = {
  currentDifficulty: defaultDifficulty,
  currentTask: normalize(equations.equations[0]),
  activeRow: 0,
  rules: rules.difficulties[defaultDifficulty],
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

function gameReducer(state, action) {
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

function GameProvider({ children }) {
  const [state, dispatch] = usePersistedReducer(
    gameReducer,
    LOCAL_STORAGE_KEY,
    defaultState
  );

  // action dispatchers
  const toggleGame = useCallback(
    (game) => {
      dispatch({
        type: "toggle",
        payload: game,
      });
    },
    [dispatch]
  );

  const actions = {
    toggleGame,
  };

  const value = { actions, sideEffects, state };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

function useGame() {
  const context = React.useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}

export { GameProvider, useGame };
