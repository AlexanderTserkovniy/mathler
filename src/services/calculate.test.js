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
