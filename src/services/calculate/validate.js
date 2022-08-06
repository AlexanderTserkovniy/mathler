// https://regexr.com/6rbd8
// noinspection RegExpSingleCharAlternation
const INCORRECT_INPUT_REG_EXP =
  /[+/*]{2}|(\+|\/|\*){2}|[+/*-]+$|^[+/*]+|^-{2}|-{2}$|-{3}|(,|\.)|[^\d/*+-]/g;
const ERROR_INCORRECT_INPUT = new Error("Incorrect input");
/**
 * @description validates equation, expects reasonable input. WARN! Does not
 *  actually run the equation, because that's what the whole codebase does...
 * @param equation {string} some equation or its absence, but in a string format
 */
const validate = (equation) => {
  // covers undefined, null, 0, false, '' etc.
  if (!equation) {
    throw ERROR_INCORRECT_INPUT;
  }

  if (equation.match(INCORRECT_INPUT_REG_EXP)) {
    throw ERROR_INCORRECT_INPUT;
  }

  return true;
};

export default validate;
