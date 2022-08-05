/**
 * Created by Oleksandr Tserkovnyi on 8/3/22.
 * kemperomg@gmail.com
 */

import equations from "../config/equations.json";
import calculate from "./calculate";

// There are expected errors
const errorMock = jest.spyOn(console, "error").mockImplementation();

describe("`calculate` function", () => {
  afterAll(() => {
    errorMock.mockRestore();
  });

  test("does calculation of a real equation", () => {
    expect(calculate(equations.equations[0].raw)).toEqual(
      equations.equations[0].result
    );
  });

  test("does calculation of a mock equation", () => {
    expect(calculate("10/2+9")).toEqual(14);
  });

  test("must return an Error if equation is incorrect", () => {
    expect(() => calculate("10/29*")).toThrow("Incorrect equation");
    expect(() => calculate("--10/7")).toThrow("Incorrect equation");
    expect(() => calculate("*10/70")).toThrow("Incorrect equation");
    expect(() => calculate("10/70-")).toThrow("Incorrect equation");
    expect(() => calculate("1/7**2")).toThrow("Incorrect equation");
  });

  test("must return an Error if equation is incorrect by current difficulty game rules", () => {
    expect(() => calculate("30/10*10")).toThrow(
      "Damn! You are a hacker, equation does not follow the rules"
    );
    expect(() => calculate("2/1*9")).toThrow(
      "Damn! You are a hacker, equation does not follow the rules"
    );
  });
});
