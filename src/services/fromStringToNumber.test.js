import fromStringToNumber from "./fromStringToNumber";

// ["10", "/", "4", "*", "-4"]
test("`fromStringToNumber` function should prepare real numbers", () => {
  expect(fromStringToNumber(["10", "/", "4", "*", "-4"])).toEqual([
    10,
    "/",
    4,
    "*",
    -4,
  ]);
  expect(fromStringToNumber(["18", "-", "-4", "/", "7"])).toEqual([
    18,
    "-",
    -4,
    "/",
    7,
  ]);
});
