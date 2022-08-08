import { gameReducer, sideEffects } from "./game";

// There are expected errors
const errorMock = jest.spyOn(console, "error").mockImplementation();

describe("`gameReducer`", () => {
  afterAll(() => {
    errorMock.mockRestore();
  });

  test("should throw if unknown action", () => {
    expect(() => gameReducer({}, null)).toThrow();
    expect(() => gameReducer({}, {})).toThrow();
    expect(() => gameReducer({}, { type: "WHAT?" })).toThrow();
  });

  describe("`delete` action", () => {
    const manualDelete1and3Active3 = {
      cellsValues: [null, 3, 1, null, "+", 9],
      activeCell: 3,
      rules: {
        length: 6,
      },
    };
    const deleteAction = { type: "actionButtonClick", payload: "Delete <" };

    test("is able to delete in the middle", () => {
      expect(gameReducer(manualDelete1and3Active3, deleteAction)).toEqual({
        ...manualDelete1and3Active3,
        activeCell: 2,
        cellsValues: [null, 3, null, null, "+", 9],
      });
    });

    test("is able to delete in the end", () => {
      expect(
        gameReducer(
          { ...manualDelete1and3Active3, activeCell: null },
          deleteAction
        )
      ).toEqual({
        ...manualDelete1and3Active3,
        activeCell: 5,
        cellsValues: [null, 3, 1, null, "+", null],
      });
    });

    test("removes previous element, even if focus on the current", () => {
      expect(
        gameReducer(
          {
            ...manualDelete1and3Active3,
            cellsValues: [null, 1, 2, 3, 4, 5],
            activeCell: 3,
          },
          deleteAction
        )
      ).toEqual({
        ...manualDelete1and3Active3,
        cellsValues: [null, 1, null, 3, 4, 5],
        activeCell: 2,
      });
    });

    test("sets focus to next available cell counting from end", () => {
      expect(
        gameReducer(
          {
            ...manualDelete1and3Active3,
            cellsValues: [null, 3, null, null, "+", 9],
            activeCell: 5,
          },
          deleteAction
        )
      ).toEqual({
        ...manualDelete1and3Active3,
        cellsValues: [null, 3, null, null, null, 9],
        activeCell: 2,
      });
    });

    test("removes from the end if all values are present", () => {
      expect(
        gameReducer(
          {
            ...manualDelete1and3Active3,
            cellsValues: [1, 2, 3, 4, 5, 6],
            activeCell: null,
          },
          deleteAction
        )
      ).toEqual({
        ...manualDelete1and3Active3,
        cellsValues: [1, 2, 3, 4, 5, null],
        activeCell: 5,
      });
    });

    test("removes last when there is no focus and moves to first when there is nothing more", () => {
      expect(
        gameReducer(
          {
            ...manualDelete1and3Active3,
            cellsValues: [null, null, null, null, null, 9],
            activeCell: null,
          },
          deleteAction
        )
      ).toEqual({
        ...manualDelete1and3Active3,
        cellsValues: [null, null, null, null, null, null],
        activeCell: 0,
      });
    });
  });

  describe("`delete all` action", () => {
    const manualDelete1and3Active3 = {
      cellsValues: [null, 3, 1, null, "+", 9],
      activeCell: 3,
      rules: {
        length: 6,
      },
    };
    const deleteAction = {
      type: "actionButtonClick",
      payload: "x Delete all x",
    };

    test("removes everything and sets active cell to the beginning", () => {
      expect(gameReducer(manualDelete1and3Active3, deleteAction)).toEqual({
        ...manualDelete1and3Active3,
        activeCell: 0,
        cellsValues: [null, null, null, null, null, null],
      });
    });
  });

  describe("`submit` or enter", () => {
    const state = {
      cellsValues: [1, 2, "+"],
    };
    const actions = {
      setValidation: jest.fn(),
      setResult: jest.fn(),
      setFinalResult: jest.fn(),
    };
    test("should set invalid state by calling specific action when equation is not correct", () => {
      sideEffects.submit(state, actions);
      expect(actions.setValidation).toHaveBeenCalledWith({
        isValid: false,
        message: expect.any(String),
      });
    });

    test("should set invalid state by calling specific action when equation is correct but result is wrong", () => {
      sideEffects.submit(
        { cellsValues: [1, 0, "/", 2, "+", 7], currentTask: { result: 14 } },
        actions
      );
      expect(actions.setValidation).toHaveBeenCalledWith({
        isValid: false,
        message: "It must be equal to 14",
      });
    });
  });

  describe("`matchSigns` should match task and symbols", () => {
    const actions = {
      setValidation: jest.fn(),
      setResult: jest.fn(),
      setFinalResult: jest.fn(),
    };

    test("should create correct structure", () => {
      expect(sideEffects.matchSigns("10+7-4", "12-9*5", actions)).toEqual([
        { state: "valid", value: "1" },
        { state: "invalid", value: "2" },
        { state: "almost", value: "-" },
        { state: "invalid", value: "9" },
        { state: "invalid", value: "*" },
        { state: "invalid", value: "5" },
      ]);
    });

    test("should NOT highlight duplicates", () => {
      // See two '+' signs, it might be `almost` state, but it must not
      expect(sideEffects.matchSigns("10+7-4", "12+9+5", actions)).toEqual([
        { state: "valid", value: "1" },
        { state: "invalid", value: "2" },
        { state: "valid", value: "+" },
        { state: "invalid", value: "9" },
        { state: "invalid", value: "+" },
        { state: "invalid", value: "5" },
      ]);
    });

    test("should count duplicates properly", () => {
      // See two '+' signs, it must use `almost` state, because task has both
      expect(sideEffects.matchSigns("10+7+4", "12+9+5", actions)).toEqual([
        { state: "valid", value: "1" },
        { state: "invalid", value: "2" },
        { state: "valid", value: "+" },
        { state: "invalid", value: "9" },
        { state: "valid", value: "+" },
        { state: "invalid", value: "5" },
      ]);
    });

    test("should count valid first, thus almost should not happen when there is match", () => {
      expect(sideEffects.matchSigns("10+7/4", "12+9+5", actions)).toEqual([
        { state: "valid", value: "1" },
        { state: "invalid", value: "2" },
        { state: "valid", value: "+" },
        { state: "invalid", value: "9" },
        { state: "invalid", value: "+" },
        { state: "invalid", value: "5" },
      ]);
    });

    test("should count long equations as well", () => {
      expect(sideEffects.matchSigns("10/7+4-1", "12+9+5/4", actions)).toEqual([
        { state: "valid", value: "1" },
        { state: "invalid", value: "2" },
        { state: "invalid", value: "+" },
        { state: "invalid", value: "9" },
        { state: "valid", value: "+" },
        { state: "invalid", value: "5" },
        { state: "almost", value: "/" },
        { state: "almost", value: "4" },
      ]);
    });
  });

  describe("`setWinLost` should invoke action to set final result", () => {
    const state = { activeRow: 3, rules: { tries: 6 } };
    const actions = {
      setValidation: jest.fn(),
      setResult: jest.fn(),
      setFinalResult: jest.fn(),
    };

    test("should invoke win if all equations are correct", () => {
      sideEffects.setWinLost(
        [
          { state: "valid", value: "1" },
          { state: "valid", value: "2" },
          { state: "valid", value: "+" },
          { state: "valid", value: "9" },
          { state: "valid", value: "+" },
          { state: "valid", value: "5" },
        ],
        state,
        actions
      );
      expect(actions.setFinalResult).toHaveBeenCalledWith("won");
    });

    test("should invoke lost if all tries are exceeded", () => {
      sideEffects.setWinLost(
        [
          { state: "valid", value: "1" },
          { state: "valid", value: "2" },
          { state: "valid", value: "+" },
          { state: "valid", value: "9" },
          { state: "valid", value: "+" },
          { state: "invalid", value: "5" },
        ],
        { ...state, activeRow: state.rules.tries - 1 },
        actions
      );
      expect(actions.setFinalResult).toHaveBeenCalledWith("lost");
    });
  });
});
