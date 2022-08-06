/**
 * Created by Oleksandr Tserkovnyi on 04.08.2022.
 * kemperomg@gmail.com
 */

/**
 *
 * @param input {*} anything but ideally an equation string
 * @return {string} trimmed and no spaces string
 * @example '18 / 2 / 3' -> '18/2/3'
 */
export const normalize = (input) => {
  if (typeof input !== "string") {
    return "";
  }

  return input.trim().replace(/\s/g, "");
};

export default normalize;
