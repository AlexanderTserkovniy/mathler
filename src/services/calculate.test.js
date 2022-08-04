/**
 * Created by Oleksandr Tserkovnyi on 8/3/22.
 * kemperomg@gmail.com
 */

import equations from "../config/equations.json";
import calculate from "./calculate";

test("`calculate` function does calculation of a real equation", () => {
  expect(calculate(equations.equations[0].raw)).toEqual(
    equations.equations[0].result
  );
});

test("`calculate` function does calculation of a mock equation", () => {
  expect(calculate("10/2+9")).toEqual(14);
});

test("`calculate` function must return an Error if equation is incorrect in syntax terms", () => {
  expect(calculate("10/29*")).toThrow("Incorrect equation");
  expect(calculate("--10/7")).toThrow("Incorrect equation");
  expect(calculate("*10/70")).toThrow("Incorrect equation");
  expect(calculate("10/70-")).toThrow("Incorrect equation");
  expect(calculate("1/7**2")).toThrow("Incorrect equation");
});
