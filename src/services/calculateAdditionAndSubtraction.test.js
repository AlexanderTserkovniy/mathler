import calculateAdditionAndSubtraction from "./calculateAdditionAndSubtraction";

describe("`calculateAdditionAndSubtraction` function should receive an array of numbers and operators represented as strings and invoke addition and subtraction returning new array", () => {
  test("does addition", () => {
    expect(calculateAdditionAndSubtraction([10, "+", 10])).toEqual([20]);
  });

  test("does addition multiple times", () => {
    expect(calculateAdditionAndSubtraction([10, "+", 10, "+", 10])).toEqual([
      30,
    ]);
  });

  test("does subtraction", () => {
    expect(calculateAdditionAndSubtraction([30, "-", 10])).toEqual([20]);
  });

  test("does subtraction multiple times", () => {
    expect(calculateAdditionAndSubtraction([30, "-", 10, "-", 10])).toEqual([
      10,
    ]);
  });

  test("does subtraction and addition", () => {
    expect(calculateAdditionAndSubtraction([30, "-", 10, "+", 10])).toEqual([
      30,
    ]);
  });

  test("does subtraction and addition multiple times", () => {
    expect(
      calculateAdditionAndSubtraction([30, "-", 10, "+", 10, "-", 7, "+", 1])
    ).toEqual([24]);
  });

  test("does nothing when there is no addition or subtraction", () => {
    expect(calculateAdditionAndSubtraction([30, "/", 10, "*", 10])).toEqual([
      30,
      "/",
      10,
      "*",
      10,
    ]);
  });

  test("returns new array IF there is addition or subtraction", () => {
    const arr = [1238, "+", -31275, "-", -38615, "-", 986981];
    expect(calculateAdditionAndSubtraction(arr)).toBeTruthy();
    expect(calculateAdditionAndSubtraction(arr)).not.toBe(arr);
  });

  test("returns the same array IF there is NO any addition nor subtraction", () => {
    const arr = [1238, "/", -31275, "*", -38615, "/", 986981];
    expect(calculateAdditionAndSubtraction(arr)).toBeTruthy();
    expect(calculateAdditionAndSubtraction(arr)).toBe(arr);
  });

  /*
    Pay attention prior to this step, function awaits clear input. Normalization
    and syntax check must be conducted earlier
  */
  test("should fail when equation is not correct syntax wise", () => {
    expect(() => calculateAdditionAndSubtraction(["-", 12])).toThrow();
    expect(() => calculateAdditionAndSubtraction([10, "-", 12, "+"])).toThrow();
    expect(() =>
      calculateAdditionAndSubtraction(["-", "-", 12, "+"])
    ).toThrow();
    expect(() => calculateAdditionAndSubtraction(["+", "-", 12])).toThrow();
    expect(() => calculateAdditionAndSubtraction(["+", 12])).toThrow();
    expect(() => calculateAdditionAndSubtraction(["+"])).toThrow();
    expect(() => calculateAdditionAndSubtraction(["-"])).toThrow();
    expect(() => calculateAdditionAndSubtraction([12, "-"])).toThrow();
    expect(() => calculateAdditionAndSubtraction([10, "+"])).toThrow();
  });
});
