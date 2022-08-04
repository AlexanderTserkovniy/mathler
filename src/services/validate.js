// TODO Write array of rules alike [Number.isSafeInteger, Number.isFinite, isNumber] etc.
/**
 * @description EVIL `eval` approach for now, but that is fast and working
 *  solution to validate
 * @param equation {String} some equation or its absence, but in a string format
 */
const validate = (equation) => {
  let result;
  try {
    result = eval(equation);
  } catch (e) {
    throw e;
  }

  return (
    // it must be a number
    typeof result === "number" &&
    // it must not be equal to NaN
    Number.isNaN(result) === false &&
    // it must be lower than BigInt
    Number.isSafeInteger(result) &&
    // it must not contain floating-point
    Number.isInteger(result)
  );
};

export default validate;
