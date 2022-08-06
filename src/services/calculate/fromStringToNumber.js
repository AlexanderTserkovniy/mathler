/**
 * Created by Oleksandr Tserkovnyi on 04.08.2022.
 * kemperomg@gmail.com
 */

import { isNumber } from "../../common/js/utils";

/**
 *
 * @description creates numbers from string numbers and do nothing for operators
 * @param equationSeparatedForCalculation {array<string>} equation represented
 *  as array of strings like: ['10', '/', '2']
 */
const fromStringToNumber = (equationSeparatedForCalculation) =>
  equationSeparatedForCalculation.map((equationItem) =>
    isNumber(equationItem) ? Number(equationItem) : equationItem
  );

export default fromStringToNumber;
