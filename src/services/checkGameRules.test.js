import checkGameRules from "./checkGameRules";

/*
  Do not mock rules.json here, because would like test to fail when something
  is changed.

  Validation functions could be tested independently, BUT I would like to see
  whole picture even if it means to fail to follow the DRY rule. I am focused on
  result, rather than some rules.
*/
describe("`checkGameRules` function", () => {
  describe("should return `false` if equation does not follow some of the rules", () => {
    test("length true operators false", () => {
      expect(checkGameRules("normal", "1/2+9/")).toEqual(false);
      expect(checkGameRules("normal", "100/19")).toEqual(false);
    });

    test("length false operators true", () => {
      expect(checkGameRules("normal", "1/2+999")).toEqual(false);
      expect(checkGameRules("normal", "100/1/9")).toEqual(false);
    });

    test("length", () => {
      expect(checkGameRules("normal", "100/2+99")).toEqual(false);
      expect(checkGameRules("normal", "1/1+9")).toEqual(false);
      expect(checkGameRules("normal", "")).toEqual(false);
      expect(checkGameRules("normal", "9999999999")).toEqual(false);
      expect(checkGameRules("normal", "90+90+90")).toEqual(false);
    });

    test("operators", () => {
      expect(checkGameRules("normal", "2-1/1/")).toEqual(false);
      expect(checkGameRules("normal", "100/2+9/9*1*3-4")).toEqual(false);
      expect(checkGameRules("normal", "100/299")).toEqual(false);
      expect(checkGameRules("normal", "")).toEqual(false);
      expect(checkGameRules("normal", "9999999999")).toEqual(false);
      expect(checkGameRules("normal", "90+90+90+90")).toEqual(false);
    });
  });

  describe("should return `true` if equation follow ALL the rules", () => {
    test("all rules are followed", () => {
      expect(checkGameRules("normal", "10/2+9")).toEqual(true);
      expect(checkGameRules("normal", "1/10-9")).toEqual(true);
      expect(checkGameRules("normal", "9*3-20")).toEqual(true);
    });

    test("works with negative values", () => {
      expect(checkGameRules("normal", "-5*3/3")).toEqual(true);
      expect(checkGameRules("normal", "3-2--3")).toEqual(true);
      expect(checkGameRules("normal", "9+-3/1")).toEqual(true);
    });
  });
});
