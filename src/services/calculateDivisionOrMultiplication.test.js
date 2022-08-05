import calculateDivisionOrMultiplication from "./calculateDivisionOrMultiplication";

describe("`calculateDivisionOrMultiplication` function should receive an array of numbers and operators represented as strings and invoke multiplication and division returning new array", () => {
  test("calculates multiplication properly", () => {
    expect(calculateDivisionOrMultiplication([20, "*", 3, "*", 2])).toEqual([
      120,
    ]);
    expect(
      calculateDivisionOrMultiplication([1, "*", 1, "*", 3, "*", 1])
    ).toEqual([3]);
  });

  test("calculates multiplication in proper order and does not touch other operators", () => {
    expect(calculateDivisionOrMultiplication([17, "-", 3, "*", 2])).toEqual([
      17,
      "-",
      6,
    ]);
    expect(
      calculateDivisionOrMultiplication([17, "-", 3, "*", 2, "+", 80])
    ).toEqual([17, "-", 6, "+", 80]);
    expect(
      calculateDivisionOrMultiplication([21, "*", 5, "-", 100, "*", 5])
    ).toEqual([105, "-", 500]);
  });

  test("calculates division properly", () => {
    expect(calculateDivisionOrMultiplication([18, "/", 6, "/", 3])).toEqual([
      1,
    ]);
    expect(
      calculateDivisionOrMultiplication([100, "/", 2, "/", 5, "/", 5])
    ).toEqual([2]);
  });

  test("calculates division in proper order and does not touch other operators", () => {
    expect(calculateDivisionOrMultiplication([17, "-", 6, "/", 2])).toEqual([
      17,
      "-",
      3,
    ]);
    expect(
      calculateDivisionOrMultiplication([17, "-", 80, "/", 4, "+", 5])
    ).toEqual([17, "-", 20, "+", 5]);
    expect(
      calculateDivisionOrMultiplication([40, "/", 5, "-", 100, "/", 5])
    ).toEqual([8, "-", 20]);
  });

  test("calculates division and multiplication in proper order and does not touch other operators", () => {
    expect(
      calculateDivisionOrMultiplication([17, "*", 5, "+", 5, "/", 1])
    ).toEqual([85, "+", 5]);
    expect(
      calculateDivisionOrMultiplication([17, "*", 5, "/", 5, "/", 4])
    ).toEqual([4.25]);
  });

  test('does nothing if there is no division "/" or multiplication "*"', () => {
    expect(calculateDivisionOrMultiplication([2, "-", 4, "+", 5])).toEqual([
      2,
      "-",
      4,
      "+",
      5,
    ]);
    expect(
      calculateDivisionOrMultiplication([1238, "+", -31275, "-", -38615])
    ).toEqual([1238, "+", -31275, "-", -38615]);
    expect(
      calculateDivisionOrMultiplication([
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

  test("returns new array", () => {
    const arr = [1238, "+", -31275, "-", -38615, "+", 986981];
    expect(calculateDivisionOrMultiplication(arr)).not.toBe(arr);
  });
});
