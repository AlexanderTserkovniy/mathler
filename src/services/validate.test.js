import validate from "./validate";

test("`validate` should throw if equation is not correct syntax-wise", () => {
  expect(() => validate("--10/2+9")).toThrow();
  expect(() => validate("-10/2*")).toThrow();
  expect(() => validate("-*/++-")).toThrow();
  expect(() => validate("-*/++-")).toThrow();
});

test("`validate` should return true if equation is correct syntax-wise", () => {
  expect(validate("10/2+9")).toEqual(true);
  expect(validate("110/200*980")).toEqual(true);
  expect(validate("-10/2+96*627")).toEqual(true);
  expect(validate("-10-29+87/3")).toEqual(true);
});

describe("`validate` should return false if equation is correct syntax-wise but returns unexpected result", () => {
  test("too big number", () => {
    expect(validate("2e64/10")).toEqual(false);
  });

  test("is NaN", () => {
    expect(validate('109/"a"')).toEqual(false);
  });

  test("has floating point", () => {
    expect(validate("10/3+9")).toEqual(false);
  });
});
