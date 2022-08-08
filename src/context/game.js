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

const getDefaultCells = (length) => new Array(length).fill(null);
const defaultDifficulty = "normal";
// TODO Move somewhere
const currentEquationIndex = Number(
  localStorage.getItem("currentEquationIndex") || 0
);
if (!localStorage.getItem("currentEquationIndex")) {
  localStorage.setItem("currentEquationIndex", 0);
}
const defaultState = {
  currentDifficulty: defaultDifficulty,
  rules: rules.difficulties[defaultDifficulty],
  currentTask: {
    ...equations.equations[currentEquationIndex],
    task: normalize(equations.equations[currentEquationIndex].raw),
  },

  history: [],
  cellsValues: getDefaultCells(rules.difficulties[defaultDifficulty].length),

  activeRow: 0,
  activeCell: 0,
  validation: null,
  buttonClicked: null,

  finalResult: null,
};

const removeOneFromArr = (arr, elem) => {
  const firstElemInside = arr.indexOf(elem);
  const newArr = [...arr];
  newArr.splice(firstElemInside, 1);
  return newArr;
};

export const sideEffects = {
  setWinLost(matchResult, state, { setFinalResult }) {
    const won = matchResult.every((res) => res.state === "valid");

    // win condition
    if (won) {
      return setFinalResult("won");
    }

    if (state.activeRow >= state.rules.tries - 1) {
      return setFinalResult("lost");
    }
  },

  matchSigns(task, userInput, { setResult }) {
    const userInputArr = [...userInput];

    let allValidSymbols = task.match(/[/+*0-9-]/g);

    const userInputWithoutValid = userInputArr.map((symbol, inx) => {
      const isValid = symbol === task.charAt(inx);

      if (isValid) {
        allValidSymbols = removeOneFromArr(allValidSymbols, symbol);

        return {
          state: "valid",
          value: symbol,
        };
      }

      return symbol;
    });

    const matchResult = userInputWithoutValid.map((symbol, inx) => {
      if (typeof symbol !== "string") return symbol;

      const isAlmost = allValidSymbols.includes(symbol);

      if (isAlmost) {
        allValidSymbols = removeOneFromArr(allValidSymbols, symbol);
      }

      return {
        state: isAlmost ? "almost" : "invalid",
        value: symbol,
      };
    });

    setResult(matchResult);

    return matchResult;
  },

  submit(state, { setValidation, setResult, setFinalResult }) {
    const toOneString = state.cellsValues.join("");
    let result;

    try {
      result = calculate(toOneString);
    } catch (e) {
      return setValidation({ isValid: false, message: e.message });
    }

    if (result !== state.currentTask.result) {
      return setValidation({
        isValid: false,
        message: `It must be equal to ${state.currentTask.result}`,
      });
    }

    const matchResult = sideEffects.matchSigns(
      state.currentTask.task,
      toOneString,
      { setResult }
    );

    sideEffects.setWinLost(matchResult, state, { setFinalResult });
  },
};

// TODO Move logic from here to wrappers above action dispatchers
export function gameReducer(state, action) {
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
          cellsValues: getDefaultCells(state.rules.length),
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
    case "setResult":
      return {
        ...state,
        history: [...state.history, action.payload],
        cellsValues: getDefaultCells(state.rules.length),
        activeRow: state.activeRow + 1,
        activeCell: 0,
      };
    case "setFinalResult":
      return {
        ...state,
        finalResult: action.payload,
      };
    case "gameRestart":
      return {
        ...defaultState,
        timeStamp: action.payload,
      };
    case "setNextChallenge":
      return {
        ...state,
        currentTask: {
          ...action.payload,
          task: normalize(action.payload.raw),
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

  const setResult = useCallback(
    (matchResult) => {
      dispatch({
        type: "setResult",
        payload: matchResult,
      });
    },
    [dispatch]
  );

  const setFinalResult = useCallback(
    (result) => {
      dispatch({
        type: "setFinalResult",
        payload: result,
      });
    },
    [dispatch]
  );

  const gameRestart = useCallback(
    (newTimeStamp) => {
      dispatch({
        type: "gameRestart",
        payload: newTimeStamp,
      });
    },
    [dispatch]
  );

  const setNextChallenge = useCallback(
    (equationChallenge) => {
      dispatch({
        type: "setNextChallenge",
        payload: equationChallenge,
      });
    },
    [dispatch]
  );

  const buttonClick = useCallback(
    (buttonValue) => {
      if (!!state.finalResult) {
        return false;
      }

      if (buttonValue === "> Enter") {
        return sideEffects.submit(state, {
          setValidation,
          setResult,
          setFinalResult,
        });
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
    [dispatch, setFinalResult, setResult, setValidation, state]
  );

  const actions = {
    buttonClick,
    buttonClickErase,
    setActiveCell,
    setCellValue,
    setValidation,
    setResult,
    setFinalResult,
    gameRestart,
    setNextChallenge,
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
