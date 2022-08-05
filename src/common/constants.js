/**
 * Created by Oleksandr Tserkovnyi on 04.08.2022.
 * kemperomg@gmail.com
 */

// replace `-` symbol with some wrapper in order to distinct it from negative
// number
export const MINUS_WRAPPER = "minus-minus";
export const MINUS_WRAPPER_REG_EXP = "minus(-)minus";
// captures minus to the group $2
export const MINUS_REG_EXP = /(-?\d+)(-)(?=-?\d+)/g;
// using constructor in order to put minus wrapper group as interpolation
export const EQUATION_REG_EXP = new RegExp(
  `-?\\d+|[/*+]|${MINUS_WRAPPER_REG_EXP}`,
  "g"
);
