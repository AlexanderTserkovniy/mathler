// noinspection EqualityComparisonWithCoercionJS

/**
 * Created by Oleksandr Tserkovnyi on 04.08.2022.
 * kemperomg@gmail.com
 */

/* easy helpers no need to test */
const isOperator = (str) => /[/*+-]/.test(str);

/* use `==` explicitly here */
// eslint-disable-next-line eqeqeq
const isNumber = (str) => Number(str) == str && Number.isInteger(Number(str));

/**
 *
 * @description creates actual handlers for numbers and for operators
 * @param equationSeparatedForCalculation {array<string>} equation represented
 *  as array of strings like: ['10', '/', '2']
 */
const fromArrayToActualHandlers = (equationSeparatedForCalculation) => {};

export default fromArrayToActualHandlers;
