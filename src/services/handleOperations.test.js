import handleOperations from "./handleOperations";

describe("`handleOperations` function should receive an array of operators to process and array of numbers and operators represented as strings and invoke all possible operations (/, *, -, +) returning new array", () => {
  describe("division and multiplication", () => {
    const divisionAndMultiplicationBound = handleOperations.bind(null, [
      "/",
      "*",
    ]);

    test("calculates multiplication properly", () => {
      expect(divisionAndMultiplicationBound([20, "*", 3, "*", 2])).toEqual([
        120,
      ]);
      expect(
        divisionAndMultiplicationBound([1, "*", 1, "*", 3, "*", 1])
      ).toEqual([3]);
    });

    test("calculates multiplication in proper order and does not touch other operators", () => {
      expect(divisionAndMultiplicationBound([17, "-", 3, "*", 2])).toEqual([
        17,
        "-",
        6,
      ]);
      expect(
        divisionAndMultiplicationBound([17, "-", 3, "*", 2, "+", 80])
      ).toEqual([17, "-", 6, "+", 80]);
      expect(
        divisionAndMultiplicationBound([21, "*", 5, "-", 100, "*", 5])
      ).toEqual([105, "-", 500]);
    });

    test("calculates division properly", () => {
      expect(divisionAndMultiplicationBound([18, "/", 6, "/", 3])).toEqual([1]);
      expect(
        divisionAndMultiplicationBound([100, "/", 2, "/", 5, "/", 5])
      ).toEqual([2]);
    });

    test("calculates division in proper order and does not touch other operators", () => {
      expect(divisionAndMultiplicationBound([17, "-", 6, "/", 2])).toEqual([
        17,
        "-",
        3,
      ]);
      expect(
        divisionAndMultiplicationBound([17, "-", 80, "/", 4, "+", 5])
      ).toEqual([17, "-", 20, "+", 5]);
      expect(
        divisionAndMultiplicationBound([40, "/", 5, "-", 100, "/", 5])
      ).toEqual([8, "-", 20]);
    });

    test("calculates division and multiplication in proper order and does not touch other operators", () => {
      expect(
        divisionAndMultiplicationBound([17, "*", 5, "+", 5, "/", 1])
      ).toEqual([85, "+", 5]);
      expect(
        divisionAndMultiplicationBound([17, "*", 5, "/", 5, "/", 4])
      ).toEqual([4.25]);
    });

    test("calculates division and multiplication in the written order", () => {
      expect(divisionAndMultiplicationBound([17, "*", 5, "/", 5])).toEqual([
        17,
      ]);
      expect(divisionAndMultiplicationBound([17, "/", 5, "*", 15])).toEqual([
        51,
      ]);
    });

    test("calculates division and multiplication in the written order more long", () => {
      expect(
        divisionAndMultiplicationBound([
          17,
          "*",
          5,
          "/",
          5,
          "*",
          3,
          "*",
          2,
          "/",
          34,
        ])
      ).toEqual([3]);
      expect(
        divisionAndMultiplicationBound([
          25,
          "/",
          5,
          "*",
          5,
          "/",
          2,
          "*",
          2,
          "/",
          5,
        ])
      ).toEqual([5]);
    });

    test("calculates division and multiplication the written in order more long and do not touch other operators", () => {
      expect(
        divisionAndMultiplicationBound([
          17,
          "*",
          5,
          "/",
          5,
          "-",
          3,
          "*",
          2,
          "/",
          6,
        ])
      ).toEqual([17, "-", 1]);
      expect(
        divisionAndMultiplicationBound([
          25,
          "/",
          5,
          "+",
          5,
          "/",
          2,
          "*",
          2,
          "-",
          5,
        ])
      ).toEqual([5, "+", 5, "-", 5]);
    });

    test('does nothing if there is no division "/" or multiplication "*"', () => {
      expect(divisionAndMultiplicationBound([2, "-", 4, "+", 5])).toEqual([
        2,
        "-",
        4,
        "+",
        5,
      ]);
      expect(
        divisionAndMultiplicationBound([1238, "+", -31275, "-", -38615])
      ).toEqual([1238, "+", -31275, "-", -38615]);
      expect(
        divisionAndMultiplicationBound([
          1238,
          "+",
          -31275,
          "-",
          -38615,
          "+",
          986981,
        ])
      ).toEqual([1238, "+", -31275, "-", -38615, "+", 986981]);
    });

    test("returns new array IF there is multiplication or division", () => {
      const arr = [1238, "+", -31275, "-", -38615, "/", 986981];
      expect(divisionAndMultiplicationBound(arr)).toBeTruthy();
      expect(divisionAndMultiplicationBound(arr)).not.toBe(arr);
    });

    test("returns the same array IF there is NO any multiplication nor division", () => {
      const arr = [1238, "+", -31275, "-", -38615, "+", 986981];
      expect(divisionAndMultiplicationBound(arr)).toBeTruthy();
      expect(divisionAndMultiplicationBound(arr)).toBe(arr);
    });

    /*
      Pay attention prior to this step, function awaits clear input. Normalization
      and syntax check must be conducted earlier
    */
    test("should fail when equation is not correct syntax wise", () => {
      expect(() => divisionAndMultiplicationBound(["/", 12])).toThrow();
      expect(() =>
        divisionAndMultiplicationBound([10, "/", 12, "*"])
      ).toThrow();
      expect(() =>
        divisionAndMultiplicationBound(["/", "/", 12, "*"])
      ).toThrow();
      expect(() => divisionAndMultiplicationBound(["*", "/", 12])).toThrow();
      expect(() => divisionAndMultiplicationBound(["*", 12])).toThrow();
      expect(() => divisionAndMultiplicationBound(["*"])).toThrow();
      expect(() => divisionAndMultiplicationBound(["/"])).toThrow();
      expect(() => divisionAndMultiplicationBound([12, "/"])).toThrow();
      expect(() => divisionAndMultiplicationBound([10, "*"])).toThrow();
    });
  });

  describe("subtraction and addition", () => {
    const subtractionAndAdditionBound = handleOperations.bind(null, ["+", "-"]);

    test("does addition", () => {
      expect(subtractionAndAdditionBound([10, "+", 10])).toEqual([20]);
    });

    test("does addition multiple times", () => {
      expect(subtractionAndAdditionBound([10, "+", 10, "+", 10])).toEqual([30]);
    });

    test("does subtraction", () => {
      expect(subtractionAndAdditionBound([30, "-", 10])).toEqual([20]);
    });

    test("does subtraction multiple times", () => {
      expect(subtractionAndAdditionBound([30, "-", 10, "-", 10])).toEqual([10]);
    });

    test("does subtraction and addition", () => {
      expect(subtractionAndAdditionBound([30, "-", 10, "+", 10])).toEqual([30]);
    });

    test("does subtraction and addition multiple times", () => {
      expect(
        subtractionAndAdditionBound([30, "-", 10, "+", 10, "-", 7, "+", 1])
      ).toEqual([24]);
    });

    test("does nothing when there is no addition or subtraction", () => {
      expect(subtractionAndAdditionBound([30, "/", 10, "*", 10])).toEqual([
        30,
        "/",
        10,
        "*",
        10,
      ]);
    });

    test("returns new array IF there is addition or subtraction", () => {
      const arr = [1238, "+", -31275, "-", -38615, "-", 986981];
      expect(subtractionAndAdditionBound(arr)).toBeTruthy();
      expect(subtractionAndAdditionBound(arr)).not.toBe(arr);
    });

    test("returns the same array IF there is NO any addition nor subtraction", () => {
      const arr = [1238, "/", -31275, "*", -38615, "/", 986981];
      expect(subtractionAndAdditionBound(arr)).toBeTruthy();
      expect(subtractionAndAdditionBound(arr)).toBe(arr);
    });

    /*
      Pay attention prior to this step, function awaits clear input. Normalization
      and syntax check must be conducted earlier
    */
    test("should fail when equation is not correct syntax wise", () => {
      expect(() => subtractionAndAdditionBound(["-", 12])).toThrow();
      expect(() => subtractionAndAdditionBound([10, "-", 12, "+"])).toThrow();
      expect(() => subtractionAndAdditionBound(["-", "-", 12, "+"])).toThrow();
      expect(() => subtractionAndAdditionBound(["+", "-", 12])).toThrow();
      expect(() => subtractionAndAdditionBound(["+", 12])).toThrow();
      expect(() => subtractionAndAdditionBound(["+"])).toThrow();
      expect(() => subtractionAndAdditionBound(["-"])).toThrow();
      expect(() => subtractionAndAdditionBound([12, "-"])).toThrow();
      expect(() => subtractionAndAdditionBound([10, "+"])).toThrow();
    });
  });
});
