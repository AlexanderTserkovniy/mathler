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

  cellsValues: new Array(rules.difficulties[defaultDifficulty].length).fill(
    null
  ),
  buttonClicked: null,
  activeCell: 0,
};

const sideEffects = {
  submit() {},
};

// TODO Move logic from here to wrappers above action dispatchers
function gameReducer(state, action) {
  switch (action.type) {
    case "buttonClick":
      return {
        ...state,
        buttonClicked: action.payload,
      };
    case "buttonClickErase":
      return {
        ...state,
        buttonClicked: null,
      };
    // TODO Move logic from here to wrappers above action dispatchers
    case "setActiveCell": {
      const { inputValue, currentInputIndex } = action.payload;
      const nextEmptyCell = state.cellsValues.findIndex(
        (val, index) => val === null && index > currentInputIndex
      );
      const newActiveCell =
        inputValue === null
          ? currentInputIndex
          : nextEmptyCell > -1
          ? nextEmptyCell
          : null;

      console.log("newActiveCell", newActiveCell);

      return {
        ...state,
        activeCell: newActiveCell,
      };
    }
    // TODO Move logic from here to wrappers above action dispatchers
    case "setCellValue":
      return {
        ...state,
        cellsValues: [
          ...state.cellsValues.slice(0, action.payload.cellIndex),
          action.payload.cellValue,
          ...state.cellsValues.slice(action.payload.cellIndex + 1),
        ],
      };
    // TODO Move logic from here to wrappers above action dispatchers
    case "actionButtonClick": {
      if (action.payload === "Delete <") {
        const existingCellValues = state.cellsValues.slice();
        // if every cell is filled
        const cellToDelete =
          state.cellsValues.every((cell) => cell !== null) ||
          state.activeCell === null
            ? // remove from the end
              state.rules.length - 1
            : state.activeCell - 1 > 0
            ? state.activeCell - 1
            : 0;
        // TODO Rewrite this piece of s...
        const nextActiveCell = state.cellsValues.reduce((aggr, next, index) => {
          if (next !== null && index < cellToDelete) {
            aggr = index + 1;
          }
          return aggr;
        }, 0);

        existingCellValues[cellToDelete] = null;

        return {
          ...state,
          cellsValues: [...existingCellValues],
          activeCell: nextActiveCell,
        };
      }
      break;
    }
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
  const setActiveCell = useCallback(
    (currentInputIndex, inputValue) => {
      dispatch({
        type: "setActiveCell",
        payload: { currentInputIndex, inputValue },
      });
    },
    [dispatch]
  );

  const buttonClickErase = useCallback(() => {
    dispatch({
      type: "buttonClickErase",
      payload: null,
    });
  }, [dispatch]);

  const buttonClick = useCallback(
    (buttonValue) => {
      if (
        buttonValue === "> Enter" ||
        buttonValue === "Delete <" ||
        buttonValue === "x Delete all x"
      ) {
        return dispatch({
          type: "actionButtonClick",
          payload: buttonValue,
        });
      }

      dispatch({
        type: "buttonClick",
        payload: buttonValue,
      });
    },
    [dispatch]
  );

  const setCellValue = useCallback(
    (cellIndex, cellValue) => {
      dispatch({
        type: "setCellValue",
        payload: {
          cellIndex,
          cellValue,
        },
      });
    },
    [dispatch]
  );

  const actions = {
    buttonClick,
    buttonClickErase,
    setActiveCell,
    setCellValue,
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
