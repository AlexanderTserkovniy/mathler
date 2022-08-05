// noinspection EqualityComparisonWithCoercionJS

/**
 * Created by Oleksandr Tserkovnyi on 05.08.2022.
 * kemperomg@gmail.com
 */

/* checks whether it is division / or multiply * or addition + or - subtraction */
export const isOperator = (str) => /[/*+-]/.test(str);

/* use `==` explicitly here */
// eslint-disable-next-line eqeqeq
export const isNumber = (str) =>
  Number(str) == str && Number.isInteger(Number(str));
