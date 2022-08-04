/**
 * Created by Oleksandr Tserkovnyi on 8/3/22.
 * kemperomg@gmail.com
 */

import catcher from "./catcher";
import validate from "./validate";

/**
 * @description – Main function which does calculation of the equation and
 *  returns result or error
 * @param equation {String} – math equation represented as a string and must be
 *  calculated properly
 * @returns {Number|Error} – if equation is correct returns number, if it is not
 *  returns an Error
 */
const calculate = (equation) => {
  if (catcher(() => validate(equation)) === false) {
    throw new Error("Incorrect equation");
  }
};

export default calculate;
