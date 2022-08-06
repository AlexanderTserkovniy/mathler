import calculateDivisionAndMultiplication from "./calculateDivisionAndMultiplication";

describe("`calculateDivisionAndMultiplication` function should receive an array of numbers and operators represented as strings and invoke multiplication and division returning new array", () => {
  test("calculates multiplication properly", () => {
    expect(calculateDivisionAndMultiplication([20, "*", 3, "*", 2])).toEqual([
      120,
    ]);
    expect(
      calculateDivisionAndMultiplication([1, "*", 1, "*", 3, "*", 1])
    ).toEqual([3]);
  });

  test("calculates multiplication in proper order and does not touch other operators", () => {
    expect(calculateDivisionAndMultiplication([17, "-", 3, "*", 2])).toEqual([
      17,
      "-",
      6,
    ]);
    expect(
      calculateDivisionAndMultiplication([17, "-", 3, "*", 2, "+", 80])
    ).toEqual([17, "-", 6, "+", 80]);
    expect(
      calculateDivisionAndMultiplication([21, "*", 5, "-", 100, "*", 5])
    ).toEqual([105, "-", 500]);
  });

  test("calculates division properly", () => {
    expect(calculateDivisionAndMultiplication([18, "/", 6, "/", 3])).toEqual([
      1,
    ]);
    expect(
      calculateDivisionAndMultiplication([100, "/", 2, "/", 5, "/", 5])
    ).toEqual([2]);
  });

  test("calculates division in proper order and does not touch other operators", () => {
    expect(calculateDivisionAndMultiplication([17, "-", 6, "/", 2])).toEqual([
      17,
      "-",
      3,
    ]);
    expect(
      calculateDivisionAndMultiplication([17, "-", 80, "/", 4, "+", 5])
    ).toEqual([17, "-", 20, "+", 5]);
    expect(
      calculateDivisionAndMultiplication([40, "/", 5, "-", 100, "/", 5])
    ).toEqual([8, "-", 20]);
  });

  test("calculates division and multiplication in proper order and does not touch other operators", () => {
    expect(
      calculateDivisionAndMultiplication([17, "*", 5, "+", 5, "/", 1])
    ).toEqual([85, "+", 5]);
    expect(
      calculateDivisionAndMultiplication([17, "*", 5, "/", 5, "/", 4])
    ).toEqual([4.25]);
  });

  test("calculates division and multiplication in the written order", () => {
    expect(calculateDivisionAndMultiplication([17, "*", 5, "/", 5])).toEqual([
      17,
    ]);
    expect(calculateDivisionAndMultiplication([17, "/", 5, "*", 15])).toEqual([
      51,
    ]);
  });

  test("calculates division and multiplication in the written order more long", () => {
    expect(
      calculateDivisionAndMultiplication([
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
      calculateDivisionAndMultiplication([
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
      calculateDivisionAndMultiplication([
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
      calculateDivisionAndMultiplication([
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
    expect(calculateDivisionAndMultiplication([2, "-", 4, "+", 5])).toEqual([
      2,
      "-",
      4,
      "+",
      5,
    ]);
    expect(
      calculateDivisionAndMultiplication([1238, "+", -31275, "-", -38615])
    ).toEqual([1238, "+", -31275, "-", -38615]);
    expect(
      calculateDivisionAndMultiplication([
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
    expect(calculateDivisionAndMultiplication(arr)).toBeTruthy();
    expect(calculateDivisionAndMultiplication(arr)).not.toBe(arr);
  });

  test("returns the same array IF there is NO any multiplication nor division", () => {
    const arr = [1238, "+", -31275, "-", -38615, "+", 986981];
    expect(calculateDivisionAndMultiplication(arr)).toBeTruthy();
    expect(calculateDivisionAndMultiplication(arr)).toBe(arr);
  });

  /*
    Pay attention prior to this step, function awaits clear input. Normalization
    and syntax check must be conducted earlier
  */
  test("should fail when equation is not correct syntax wise", () => {
    expect(() => calculateDivisionAndMultiplication(["/", 12])).toThrow();
    expect(() =>
      calculateDivisionAndMultiplication([10, "/", 12, "*"])
    ).toThrow();
    expect(() =>
      calculateDivisionAndMultiplication(["/", "/", 12, "*"])
    ).toThrow();
    expect(() => calculateDivisionAndMultiplication(["*", "/", 12])).toThrow();
    expect(() => calculateDivisionAndMultiplication(["*", 12])).toThrow();
    expect(() => calculateDivisionAndMultiplication(["*"])).toThrow();
    expect(() => calculateDivisionAndMultiplication(["/"])).toThrow();
    expect(() => calculateDivisionAndMultiplication([12, "/"])).toThrow();
    expect(() => calculateDivisionAndMultiplication([10, "*"])).toThrow();
  });
});
