import fromStringToNumberOperatorArray, {
  equationToArray,
  unwrapMinuses,
  wrapMinuses,
} from "./fromStringToNumberOperatorArray";
import { MINUS_WRAPPER } from "../../common/js/constants";

test("`fromStringToNumberOperatorArray` function should generate an array of operators and numbers entities as strings", () => {
  expect(fromStringToNumberOperatorArray("10/4*-4")).toEqual([
    "10",
    "/",
    "4",
    "*",
    "-4",
  ]);
  expect(fromStringToNumberOperatorArray("20--10+30")).toEqual([
    "20",
    "-",
    "-10",
    "+",
    "30",
  ]);
});

describe("`wrapMinuses` utility function", () => {
  test("should detect minus as operator and wrap it into template", () => {
    expect(wrapMinuses("2-2*10")).toEqual(`2${MINUS_WRAPPER}2*10`);
    expect(wrapMinuses("-2--2/1--10")).toEqual(
      `-2${MINUS_WRAPPER}-2/1${MINUS_WRAPPER}-10`
    );
    expect(wrapMinuses("10/5-2-1")).toEqual(
      `10/5${MINUS_WRAPPER}2${MINUS_WRAPPER}1`
    );
  });

  test("should avoid negative numbers", () => {
    expect(wrapMinuses("-20/2*-10")).toEqual("-20/2*-10");
    expect(wrapMinuses("-5*-5+-90")).toEqual("-5*-5+-90");
    expect(wrapMinuses("-80+-80/-90")).toEqual("-80+-80/-90");
  });

  test("should avoid other symbols", () => {
    expect(wrapMinuses("2/2*10")).toEqual(`2/2*10`);
    expect(wrapMinuses("5*5+90")).toEqual(`5*5+90`);
    expect(wrapMinuses("10/5*5+77")).toEqual(`10/5*5+77`);
  });
});

describe("`equationToArray` utility function", () => {
  test("should create an array from minus wrapped equation", () => {
    expect(equationToArray(`-2/20${MINUS_WRAPPER}-30`)).toEqual([
      "-2",
      "/",
      "20",
      MINUS_WRAPPER,
      "-30",
    ]);
    expect(
      equationToArray(`-2/20${MINUS_WRAPPER}-30${MINUS_WRAPPER}40`)
    ).toEqual(["-2", "/", "20", MINUS_WRAPPER, "-30", MINUS_WRAPPER, "40"]);
  });

  test("should create an array from equation without wrapped minuses", () => {
    expect(equationToArray(`-2/20/-30+170*16`)).toEqual([
      "-2",
      "/",
      "20",
      "/",
      "-30",
      "+",
      "170",
      "*",
      "16",
    ]);
    expect(equationToArray(`2/20*30+170`)).toEqual([
      "2",
      "/",
      "20",
      "*",
      "30",
      "+",
      "170",
    ]);
  });
});

describe("`unwrapMinuses` utility function", () => {
  test("should map an array and replace wrapped minuses with simple minuses", () => {
    expect(
      unwrapMinuses([
        "-2",
        "/",
        "20",
        MINUS_WRAPPER,
        "-30",
        MINUS_WRAPPER,
        "40",
      ])
    ).toEqual(["-2", "/", "20", "-", "-30", "-", "40"]);
    expect(unwrapMinuses(["-2", "/", "20", MINUS_WRAPPER, "-30"])).toEqual([
      "-2",
      "/",
      "20",
      "-",
      "-30",
    ]);
  });

  test("should map an array and avoid any changes if there is no wrapped minuses", () => {
    expect(unwrapMinuses(["-2", "/", "20", "*", "-30", "/", "40"])).toEqual([
      "-2",
      "/",
      "20",
      "*",
      "-30",
      "/",
      "40",
    ]);
    expect(unwrapMinuses(["20", "/", "4", "*", "3", "+", "2"])).toEqual([
      "20",
      "/",
      "4",
      "*",
      "3",
      "+",
      "2",
    ]);
  });
});
