/**
 * Created by Oleksandr Tserkovnyi on 06.08.2022.
 * kemperomg@gmail.com
 */

import "./EquationGridCell.scss";
import { UI_EQUATION_REG_EXP } from "../../common/js/constants";
import { useCallback, useRef } from "react";

function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

export const EquationGridCell = ({ ...props }) => {
  const inputRef = useRef();
  const onChange = useCallback((e) => {
    if (Boolean(inputRef.current?.checkValidity()) === false) {
      // effect of erasing
      setTimeout(() => {
        inputRef.current.value = "";
      }, 50);
    }
  }, []);
  const onFocus = useCallback((e) => {
    inputRef.current?.select();
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      className="EquationGridCell"
      maxLength={1}
      pattern={UI_EQUATION_REG_EXP}
      onChange={onChange}
      onFocus={onFocus}
      {...props}
    />
  );
};
