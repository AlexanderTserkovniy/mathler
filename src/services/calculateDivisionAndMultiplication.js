/**
 * Created by Oleksandr Tserkovnyi on 05.08.2022.
 * kemperomg@gmail.com
 */

import {
  getMinValidIndex,
  isOperatorOrIsNumber,
  operation,
} from "../common/utils";

/**
 *
 * @description makes division or multiplication for input array
 * @param equationArrayWithNumbers {array<number|string>} equation as set of
 *  numbers and operator strings like: [10, '/', 2, '*', -4]
 */
const calculateDivisionAndMultiplication = (equationArrayWithNumbers) => {
  const multiplicationIndex = equationArrayWithNumbers.indexOf("*");
  const divisionIndex = equationArrayWithNumbers.indexOf("/");
  const containsMultiplicationOrDivision =
    Boolean(~divisionIndex) || Boolean(~multiplicationIndex);

  if (equationArrayWithNumbers.every(isOperatorOrIsNumber) === false) {
    throw new Error(
      `This equation cannot be calculated: ${equationArrayWithNumbers.join("")}`
    );
  }

  if (containsMultiplicationOrDivision === false) {
    return equationArrayWithNumbers;
  }

  const firstOperationIndexToProcess = getMinValidIndex([
    multiplicationIndex,
    divisionIndex,
  ]);

  // WARN! It will be mutated!
  const clone = equationArrayWithNumbers.slice();

  // WARN! On purpose mutation!
  operation(
    clone[firstOperationIndexToProcess],
    clone,
    firstOperationIndexToProcess
  );

  return calculateDivisionAndMultiplication(clone);
};

export default calculateDivisionAndMultiplication;
