import {
  getMinValidIndex,
  intersection,
  isDivisionOrMultiplyOperator,
  isNumber,
  isObject,
  isOperator,
  isOperatorOrIsNumber,
  operation,
  typeOf,
} from "./utils";

describe("utilities", () => {
  test("`isOperator`", () => {
    expect(isOperator("/")).toEqual(true);
    expect(isOperator("*")).toEqual(true);
    expect(isOperator("+")).toEqual(true);
    expect(isOperator("-")).toEqual(true);
  });

  test("not `isOperator`", () => {
    expect(isOperator("%")).toEqual(false);
    expect(isOperator("(")).toEqual(false);
    expect(isOperator(")")).toEqual(false);
    expect(isOperator("&")).toEqual(false);
    expect(isOperator("^")).toEqual(false);
  });

  test("`isNumber`", () => {
    expect(isNumber("10")).toEqual(true);
    expect(isNumber("-20")).toEqual(true);
    expect(isNumber("0")).toEqual(true);
    expect(isNumber(10)).toEqual(true);
    expect(isNumber(-33)).toEqual(true);
    expect(isNumber("0.17")).toEqual(true);
    expect(isNumber(0.17)).toEqual(true);
  });

  test("not `isNumber`", () => {
    expect(isNumber(NaN)).toEqual(false);
    expect(isNumber(-Infinity)).toEqual(false);
    expect(isNumber(Infinity)).toEqual(false);
    expect(isNumber(null)).toEqual(false);
    expect(isNumber(undefined)).toEqual(false);
  });

  test("`isDivisionOrMultiplyOperator`", () => {
    expect(isDivisionOrMultiplyOperator("*")).toEqual(true);
    expect(isDivisionOrMultiplyOperator("/")).toEqual(true);
  });

  test("not `isDivisionOrMultiplyOperator`", () => {
    expect(isDivisionOrMultiplyOperator("+")).toEqual(false);
    expect(isDivisionOrMultiplyOperator("-")).toEqual(false);
    expect(isDivisionOrMultiplyOperator("&")).toEqual(false);
    expect(isDivisionOrMultiplyOperator("^")).toEqual(false);
    expect(isDivisionOrMultiplyOperator("(")).toEqual(false);
    expect(isDivisionOrMultiplyOperator(")")).toEqual(false);
  });

  test("`operation` MUST mutate original array", () => {
    const originalArray = [10, "/", 2];
    operation("/", originalArray, 1);
    expect(originalArray).toEqual([5]);
    expect(originalArray.length).toEqual(1);
    expect(originalArray).toBe(originalArray);
  });

  test("`operation` throws if there is no such operator", () => {
    const originalArray = [10, "/", 2];
    expect(() => operation("(", originalArray, 1)).toThrow("NO SUCH OPERATOR");
  });

  test("`operation` is able to conduct division", () => {
    const originalArray = [10, "/", 2];
    operation("/", originalArray, 1);
    expect(originalArray).toEqual([5]);
  });

  test("`operation` is able to conduct multiplication", () => {
    const originalArray = [10, "*", 2];
    operation("*", originalArray, 1);
    expect(originalArray).toEqual([20]);
  });

  test("`operation` is able to conduct addition", () => {
    const originalArray = [10, "+", 2];
    operation("+", originalArray, 1);
    expect(originalArray).toEqual([12]);
  });

  test("`operation` is able to conduct subtraction", () => {
    const originalArray = [10, "-", 2];
    operation("-", originalArray, 1);
    expect(originalArray).toEqual([8]);
  });

  test("`isOperatorOrIsNumber`", () => {
    expect(isOperatorOrIsNumber(20)).toEqual(true);
    expect(isOperatorOrIsNumber(-20)).toEqual(true);
    expect(isOperatorOrIsNumber(0)).toEqual(true);
    expect(isOperatorOrIsNumber(-0)).toEqual(true);
    expect(isOperatorOrIsNumber("/")).toEqual(true);
    expect(isOperatorOrIsNumber("*")).toEqual(true);
    expect(isOperatorOrIsNumber("-")).toEqual(true);
    expect(isOperatorOrIsNumber("+")).toEqual(true);
  });

  test("`isOperatorOrIsNumber` should return false in these cases", () => {
    expect(isOperatorOrIsNumber(NaN)).toEqual(false);
    expect(isOperatorOrIsNumber(null)).toEqual(false);
    expect(isOperatorOrIsNumber(undefined)).toEqual(false);
    expect(isOperatorOrIsNumber("NaN10")).toEqual(false);
    expect(isOperatorOrIsNumber("10NaN")).toEqual(false);
  });

  test("`getMinValidIndex` returns indexes greater than -1", () => {
    expect(getMinValidIndex([-1, 2])).toEqual(2);
    expect(getMinValidIndex([3, -1, 2, 1])).toEqual(1);
    expect(getMinValidIndex([0, -1])).toEqual(0);
    expect(getMinValidIndex([-1, -1, 1, 2, 99, 0])).toEqual(0);
  });

  test("`getMinValidIndex` returns incorrect values if input is corrupted", () => {
    expect(getMinValidIndex([-1, -1])).toEqual(Infinity);
    expect(getMinValidIndex([-1])).toEqual(Infinity);
    expect(getMinValidIndex([])).toEqual(Infinity);
    // noinspection JSConsecutiveCommasInArrayLiteral
    expect(getMinValidIndex([-1, -1, -1, -1, , , , , -1])).toEqual(Infinity);
  });

  test("`typeOf`", () => {
    expect(typeOf(async function () {})).toEqual("asyncfunction");
    expect(typeOf(/1/)).toEqual("regexp");
    expect(typeOf(2n)).toEqual("bigint");
    expect(typeOf(Symbol())).toEqual("symbol");
    expect(typeOf(null)).toEqual("null");
    expect(typeOf(undefined)).toEqual("undefined");
    expect(typeOf({})).toEqual("object");
    expect(typeOf([])).toEqual("array");
  });

  test("`isObject`", () => {
    expect(isObject({})).toEqual(true);
    expect(isObject({ a: 1 })).toEqual(true);
    expect(isObject(Object.create(null))).toEqual(true);
  });

  test("not `isObject`", () => {
    expect(isObject([])).toEqual(false);
    expect(isObject(() => {})).toEqual(false);
    expect(isObject(/1/)).toEqual(false);
    expect(isObject(null)).toEqual(false);
    expect(isObject(NaN)).toEqual(false);
  });

  test("`intersection` returns intersected entities via order they are presented in the biggest length array otherwise from the second one", () => {
    expect(intersection([1, 2, 3], [2, 3, 4, 5])).toEqual([2, 3]);
    expect(intersection([7, 8, 99, 100, 13, 3], [99, 919, 77, 7])).toEqual([
      7, 99,
    ]);
    expect(
      intersection(["notfirst", "butsecond"], ["butsecond", "notfirst"])
    ).toEqual(["butsecond", "notfirst"]);
    expect(intersection([1, 2, 3], [3, 4, 2])).toEqual([3, 2]);
  });

  test("`intersection` returns empty array", () => {
    expect(intersection([1, 2, 3], [4, 5, 6])).toEqual([]);
    expect(intersection([7, 8, 99, 100, 13, 3], [991, 919, 77, 73])).toEqual(
      []
    );
    expect(intersection([], [])).toEqual([]);
  });

  test("`doObjectsHaveSameKeys` returns empty array", () => {
    expect(intersection([1, 2, 3], [4, 5, 6])).toEqual([]);
    expect(intersection([7, 8, 99, 100, 13, 3], [991, 919, 77, 73])).toEqual(
      []
    );
    expect(intersection([], [])).toEqual([]);
  });
});
