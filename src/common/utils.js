// noinspection EqualityComparisonWithCoercionJS

/**
 * Created by Oleksandr Tserkovnyi on 05.08.2022.
 * kemperomg@gmail.com
 */

/* checks whether it is division / or multiplication * or addition + or - subtraction */
export const isOperator = (str) => /[/*+-]/.test(str);

/* checks whether it is division / or multiplication * */
/* TODO Someday combine this and above */
export const isDivisionOrMultiplyOperator = (str) => str === "*" || str === "/";

/* use `==` explicitly here */
// eslint-disable-next-line eqeqeq
export const isNumber = (str) =>
  Number.isFinite(Number(str)) && !isNaN(str) && !isNaN(parseFloat(str));

export const isOperatorOrIsNumber = (input) =>
  isOperator(input) || isNumber(input);

// WARN! Mutates! I know about immutable best practice, but again see README,
// I am concerned about people reading this code not about machines, so it is
// much easier to work with the same arr in memory especially having such
// convenient method as .splice
export const operation = (operator, arr, indexFrom) => {
  arr.splice(
    indexFrom - 1,
    3,
    (() => {
      const leftOperand = arr[indexFrom - 1];
      const rightOperand = arr[indexFrom + 1];

      switch (true) {
        case operator === "/": {
          return leftOperand / rightOperand;
        }
        case operator === "*": {
          return leftOperand * rightOperand;
        }
        case operator === "+": {
          return leftOperand + rightOperand;
        }
        case operator === "-": {
          return leftOperand - rightOperand;
        }
        default:
          throw new Error("NO SUCH OPERATOR");
      }
    })()
  );
  // no return because IT MUTATES original array! It's made on purpose.
};

/**
 *
 * @param arr {number[]} index array like [1, -1, 3, 2], must be
 *  tuple<number, number>
 * @returns {number} minimum index, which is greater than -1
 */
export const getMinValidIndex = (arr) =>
  Math.min.apply(
    Math,
    arr.filter((inx) => inx > -1)
  );
