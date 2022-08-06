import normalize from "./normalize";

describe("`normalize` function creates a string without spaces", () => {
  test("trims all the spaces inside and outside", () => {
    expect(normalize("     7 *3   /  -6     ")).toEqual("7*3/-6");
    expect(normalize(" 10 *3-  -20")).toEqual("10*3--20");
    expect(normalize(" 10 *3-  -20     ")).toEqual("10*3--20");
    expect(normalize("     10 *3-  -20     ")).toEqual("10*3--20");
  });

  test("does not check validity and symbols", () => {
    expect(normalize("     hey bruh     ")).toEqual("heybruh");
    expect(normalize(" 10 *3minus  -20")).toEqual("10*3minus-20");
    expect(normalize(" 10 *3-  -20     ready")).toEqual("10*3--20ready");
    expect(normalize("     10 *3-  -20     ")).toEqual("10*3--20");
  });

  test("returns string if it was not a string", () => {
    expect(normalize(0)).toEqual("");
    expect(normalize(-1 - "")).toEqual("");
    expect(normalize(undefined)).toEqual("");
    expect(normalize(null)).toEqual("");
    expect(normalize(false)).toEqual("");
    expect(normalize(NaN)).toEqual("");
    expect(normalize(Infinity)).toEqual("");
    expect(normalize(-Infinity)).toEqual("");
  });
});
