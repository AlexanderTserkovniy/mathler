import validate from "./validate";

describe("`validate` function checks syntax", () => {
  // https://regexr.com/6rbd8
  test("`validate` should throw if equation is not correct syntax-wise", () => {
    expect(() => validate("--10/2+9")).toThrow();
    expect(() => validate("-10/2*")).toThrow();
    expect(() => validate("-*/++-")).toThrow();
    expect(() => validate("-*1++-")).toThrow();
    expect(() => validate("2e64/10")).toThrow();
    expect(() => validate('109/"a"')).toThrow();
    expect(() => validate("0,1+13")).toThrow();
    expect(() => validate("20.1+1")).toThrow();
    expect(() => validate("2---10")).toThrow();
    expect(() => validate("---10*1")).toThrow();
    expect(() => validate("1/7**2")).toThrow();
    expect(() => validate("10/70-")).toThrow();
    expect(() => validate("*10/70")).toThrow();
    expect(() => validate("--10/7")).toThrow();
    expect(() => validate("--10/7")).toThrow();
  });

  test("should throw if equation is somehow not expected string", () => {
    expect(() => validate(undefined)).toThrow();
    expect(() => validate(null)).toThrow();
    expect(() => validate(0)).toThrow();
    expect(() => validate(false)).toThrow();
    expect(() => validate("")).toThrow();
  });

  test("`validate` should return true if equation is correct syntax-wise", () => {
    expect(validate("10/2+9")).toEqual(true);
    expect(validate("110/200*980")).toEqual(true);
    expect(validate("-10/2+96*627")).toEqual(true);
    expect(validate("-10-29+87/3")).toEqual(true);
    expect(validate("100+90*3/7--20--30+-60")).toEqual(true);
    expect(validate("-200+90*3/7--20--30+-60")).toEqual(true);
  });
});
