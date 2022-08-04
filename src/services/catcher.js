/**
 * Created by Oleksandr Tserkovnyi on 8/3/22.
 * kemperomg@gmail.com
 */

export const catcher = (func) => {
  let result = false;
  try {
    result = func();
  } catch (e) {
    // TODO Create a popup with error
    console.error(e);
  }
  return result;
};

export default catcher;
