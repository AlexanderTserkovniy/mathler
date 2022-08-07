/**
 * Created by Oleksandr Tserkovnyi on 06.08.2022.
 * kemperomg@gmail.com
 */

import React, { useCallback } from "react";
import { usePersistedReducer } from "./usePersistedReducer";
import equations from "../config/equations";
import rules from "../config/rules";
import normalize from "../services/calculate/normalize";
import calculate from "../services/calculate/calculate";

const LOCAL_STORAGE_KEY = "game";

const GameContext = React.createContext();

const defaultDifficulty = "normal";
const defaultState = {
  currentDifficulty: defaultDifficulty,
  currentTask: {
    ...equations.equations[0],
    task: normalize(equations.equations[0].raw),
  },
  activeRow: 0,
  rules: rules.difficulties[defaultDifficulty],

  cellsValues: new Array(rules.difficulties[defaultDifficulty].length).fill(
    null
  ),
  buttonClicked: null,
  activeCell: 0,
  validation: null,
};

const sideEffects = {
  submit(state, { setValidation }) {
    console.log("state.cellsValues.join('')", state.cellsValues.join(""));

    const toOneString = state.cellsValues.join("");
    let result;

    try {
      result = calculate(toOneString);
    } catch (e) {
      return setValidation({ isValid: false, message: e.message });
    }

    console.log(result);
  },
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
      } else if (action.payload === "x Delete all x") {
        return {
          ...state,
          cellsValues: new Array(state.rules.length).fill(null),
          activeCell: 0,
        };
      }
      break;
    }
    case "setValidation":
      return {
        ...state,
        validation:
          action.payload === null
            ? null
            : {
                isValid: action.payload.isValid,
                message: action.payload.message,
              },
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

  const setValidation = useCallback(
    (payload) => {
      dispatch({
        type: "setValidation",
        payload,
      });
    },
    [dispatch]
  );

  const buttonClick = useCallback(
    (buttonValue) => {
      if (buttonValue === "> Enter") {
        return sideEffects.submit(state, { setValidation });
      }

      if (buttonValue === "Delete <" || buttonValue === "x Delete all x") {
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
    [dispatch, setValidation, state]
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
    setValidation,
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
