/**
 * Created by Oleksandr Tserkovnyi on 04.08.2022.
 * kemperomg@gmail.com
 */

import {
  EQUATION_REG_EXP,
  MINUS_REG_EXP,
  MINUS_WRAPPER,
} from "../common/constants";

/*
  as example let's take the '18/9--100' equation
  This operation will create in between state like '18/9minus-minus-100'
*/
export const wrapMinuses = (equation) =>
  equation.replace(MINUS_REG_EXP, (_, group1) => `${group1}${MINUS_WRAPPER}`);

/*
  as example '18/9minus-minus-100'
  This operation will create in between state like [ '18', '/', '9', 'minus-minus', '-100' ]
 */
export const equationToArray = (equationWithWrappedMinuses) =>
  equationWithWrappedMinuses.match(EQUATION_REG_EXP);

/*
  as example [ '18', '/', '9', 'minus-minus', '-100' ]
  This operation will create in between state like [ '18', '/', '9', '-', '-100' ]
 */
export const unwrapMinuses = (equationSeparated) =>
  equationSeparated.map((eq) => eq.replace(MINUS_WRAPPER, "-"));

/**
 *
 * @description prepare array of numbers and operators as separated entities,
 *  see @example. Done in two traversed way, because `-` operator could appear
 *  as a negative number
 * @param equation {string} validated & normalized equation as a string
 * @return {array<string>} or operators and numbers
 * @example '18/9--100' -> ['18', '/', '9', '-', '-100']
 */
const fromStringToNumberOperatorArray = (equation) => {
  const equationWithWrappedMinuses = wrapMinuses(equation);
  const equationSeparated = equationToArray(equationWithWrappedMinuses);
  const equationWithUnwrappedMinuses = unwrapMinuses(equationSeparated);
  return equationWithUnwrappedMinuses;
};

export default fromStringToNumberOperatorArray;
