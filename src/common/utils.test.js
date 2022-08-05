import { isNumber, isOperator } from "./utils";

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
  });

  test("not isNumber", () => {
    expect(isNumber("0.17")).toEqual(false);
    expect(isNumber(0.17)).toEqual(false);
    expect(isNumber(NaN)).toEqual(false);
    expect(isNumber(-Infinity)).toEqual(false);
    expect(isNumber(Infinity)).toEqual(false);
    expect(isNumber(null)).toEqual(false);
    expect(isNumber(undefined)).toEqual(false);
  });
});
