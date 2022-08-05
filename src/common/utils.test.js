import {
  add,
  divide,
  isDivisionOrMultiplyOperator,
  isNumber,
  isOperator,
  isOperatorOrIsNumber,
  multiply,
  operation,
  subtract,
} from "./utils";

describe("utilities", () => {
  test("isOperator", () => {
    expect(isOperator("/")).toEqual(true);
    expect(isOperator("*")).toEqual(true);
    expect(isOperator("+")).toEqual(true);
    expect(isOperator("-")).toEqual(true);
  });

  test("not isOperator", () => {
    expect(isOperator("%")).toEqual(false);
    expect(isOperator("(")).toEqual(false);
    expect(isOperator(")")).toEqual(false);
    expect(isOperator("&")).toEqual(false);
    expect(isOperator("^")).toEqual(false);
  });

  test("isNumber", () => {
    expect(isNumber("10")).toEqual(true);
    expect(isNumber("-20")).toEqual(true);
    expect(isNumber("0")).toEqual(true);
    expect(isNumber(10)).toEqual(true);
    expect(isNumber(-33)).toEqual(true);
    expect(isNumber("0.17")).toEqual(true);
    expect(isNumber(0.17)).toEqual(true);
  });

  test("not isNumber", () => {
    expect(isNumber(NaN)).toEqual(false);
    expect(isNumber(-Infinity)).toEqual(false);
    expect(isNumber(Infinity)).toEqual(false);
    expect(isNumber(null)).toEqual(false);
    expect(isNumber(undefined)).toEqual(false);
  });

  test("isDivisionOrMultiplyOperator", () => {
    expect(isDivisionOrMultiplyOperator("*")).toEqual(true);
    expect(isDivisionOrMultiplyOperator("/")).toEqual(true);
  });

  test("not isDivisionOrMultiplyOperator", () => {
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

  test("`add`, `divide`, `multiply`, `subtract` must do what they should do", () => {
    const divideArr = [6, "/", 2];
    divide(divideArr, 1);
    expect(divideArr).toEqual([3]);
    const multiplyArr = [6, "*", 2];
    multiply(multiplyArr, 1);
    expect(multiplyArr).toEqual([12]);
    const addArr = [6, "+", 2];
    add(addArr, 1);
    expect(addArr).toEqual([8]);
    const subtractArr = [6, "-", 2];
    subtract(subtractArr, 1);
    expect(subtractArr).toEqual([4]);
  });

  test("isOperatorOrIsNumber", () => {
    expect(isOperatorOrIsNumber(20)).toEqual(true);
    expect(isOperatorOrIsNumber(-20)).toEqual(true);
    expect(isOperatorOrIsNumber(0)).toEqual(true);
    expect(isOperatorOrIsNumber(-0)).toEqual(true);
    expect(isOperatorOrIsNumber("/")).toEqual(true);
    expect(isOperatorOrIsNumber("*")).toEqual(true);
    expect(isOperatorOrIsNumber("-")).toEqual(true);
    expect(isOperatorOrIsNumber("+")).toEqual(true);
  });

  test("isOperatorOrIsNumber should return false in these cases", () => {
    expect(isOperatorOrIsNumber(NaN)).toEqual(false);
    expect(isOperatorOrIsNumber(null)).toEqual(false);
    expect(isOperatorOrIsNumber(undefined)).toEqual(false);
    expect(isOperatorOrIsNumber("NaN10")).toEqual(false);
    expect(isOperatorOrIsNumber("10NaN")).toEqual(false);
  });
});
