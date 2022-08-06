/**
 * Created by Oleksandr Tserkovnyi on 05.08.2022.
 * kemperomg@gmail.com
 */

import {
  getMinValidIndex,
  isOperatorOrIsNumber,
  operation,
} from "../../common/utils";

/**
 *
 * @description makes all operations ("/"|"*"|"-"|"+") in the index order. Does not follow math rule of division&multiplication first, so use separately e.g.:
 *  1. const step1 = handleOperations(["/", "*"]);
 *  2. const step2 = handleOperations(["-", "+"]);
 *  Order in the `operations` array does not matter
 * @param operations {array<"/"|"*"|"-"|"+">} exact operations to conduct
 * @param equationArrayWithNumbers {array<number|string>} equation as set of
 *  numbers and operator strings like: [10, '/', 2, '*', -4]
 */
const handleOperations = (operations, equationArrayWithNumbers) => {
  const equationIndexesOfOperations = operations.map((operation) =>
    equationArrayWithNumbers.indexOf(operation)
  );
  const containsOperation = equationIndexesOfOperations.some(
    (operationIndex) => operationIndex > -1
  );

  if (equationArrayWithNumbers.every(isOperatorOrIsNumber) === false) {
    throw new Error(
      `This equation cannot be calculated: ${equationArrayWithNumbers.join("")}`
    );
  }

  if (containsOperation === false) {
    return equationArrayWithNumbers;
  }

  const firstOperationIndexToProcess = getMinValidIndex(
    equationIndexesOfOperations
  );

  // WARN! It will be mutated!
  const clone = equationArrayWithNumbers.slice();

  // WARN! On purpose mutation!
  operation(
    clone[firstOperationIndexToProcess],
    clone,
    firstOperationIndexToProcess
  );

  return handleOperations(operations, clone);
};

export default handleOperations;
