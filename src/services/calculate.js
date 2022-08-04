/**
 * Created by Oleksandr Tserkovnyi on 8/3/22.
 * kemperomg@gmail.com
 */

import catcher from "./catcher";
import validate from "./validate";
import { checkGameRules } from "./checkGameRules";
import normalize from "./normalize";

// TODO Make it choosable
const DIFFICULTY = "normal";
/**
 * @description – Main function which does calculation of the equation and
 *  returns result or error
 * @param rawEquation {*} – math equation ideally represented as a string and
 *  must be calculated properly
 * @returns {number} – if equation is correct returns number
 * @throws {error} – could throw if equation is not correct or used differently
 */
const calculate = (rawEquation) => {
  const equation = normalize(rawEquation);

  if (catcher(() => validate(equation)) === false) {
    throw new Error("Incorrect equation");
  }

  if (catcher(() => checkGameRules(DIFFICULTY, equation)) === false) {
    throw new Error(
      "Damn! You are a hacker, equation does not follow the rules"
    );
  }

  return "MUST FAIL! NOT IMPLEMENTED!";
};

export default calculate;
