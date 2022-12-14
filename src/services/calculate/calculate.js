/**
 * Created by Oleksandr Tserkovnyi on 8/3/22.
 * kemperomg@gmail.com
 */

import catcher from "./catcher";
import validate from "./validate";
import { checkGameRules } from "./checkGameRules";
import normalize from "./normalize";
import fromStringToNumberOperatorArray from "./fromStringToNumberOperatorArray";
import fromStringToNumber from "./fromStringToNumber";
import handleOperations from "./handleOperations";

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

  const equationSeparatedForCalculation =
    fromStringToNumberOperatorArray(equation);

  const equationArrayWithNumbers = fromStringToNumber(
    equationSeparatedForCalculation
  );

  const equationWithCalculatedDivisionAndMultiplication = handleOperations(
    ["/", "*"],
    equationArrayWithNumbers
  );

  const equationWithCalculatedAdditionAndSubtraction = handleOperations(
    ["-", "+"],
    equationWithCalculatedDivisionAndMultiplication
  );

  // final validation, there must be only 1 element
  if (equationWithCalculatedAdditionAndSubtraction.length > 1) {
    throw new Error("Unexpected error, please contact author!");
  }

  return equationWithCalculatedAdditionAndSubtraction[0];
};

export default calculate;
