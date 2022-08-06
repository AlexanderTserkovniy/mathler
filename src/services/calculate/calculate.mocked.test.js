/**
 * Created by Oleksandr Tserkovnyi on 8/5/22.
 * kemperomg@gmail.com
 */

import calculate from "./calculate";

jest.mock("./handleOperations", () => () => [1, "+", 2]);

describe("must throw unexpected error in case the final result is weird", () => {
  afterAll(() => {
    jest.unmock("./handleOperations");
  });

  test("unexpected end of final calculation", () => {
    expect(() => calculate("-5/5+9")).toThrow(
      "Unexpected error, please contact author!"
    );
  });
});
