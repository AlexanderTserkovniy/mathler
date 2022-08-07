/**
 * Created by Oleksandr Tserkovnyi on 06.08.2022.
 * kemperomg@gmail.com
 */

import "./EquationGridCell.scss";
import { UI_EQUATION_REG_EXP } from "../../common/js/constants";
import { memo, useCallback, useEffect, useRef } from "react";
import { isNumber } from "../../common/js/utils";

export const EquationGridCell = memo(
  ({
    setActiveCell,
    setCellValue,
    buttonClickErase,
    buttonClicked,
    activeCell,
    value,
    index,
    disabled,
    state,
    ...props
  }) => {
    const inputRef = useRef();
    const onChange = useCallback(
      (e) => {
        // invalid input
        if (Boolean(inputRef.current?.checkValidity()) === false) {
          // effect of erasing
          setTimeout(() => {
            inputRef.current.value = value;
          }, 100);
        } else {
          const value = isNumber(e.target.value)
            ? Number(e.target.value)
            : inputRef.current.value === ""
            ? null
            : e.target.value;
          setCellValue(index, value);
          setActiveCell(index, value);
        }
      },
      [index, setActiveCell, setCellValue, value]
    );
    const onFocus = useCallback((e) => {
      inputRef.current?.select();
    }, []);

    useEffect(() => {
      if (!disabled && index === activeCell && buttonClicked !== null) {
        setCellValue(index, buttonClicked);
        buttonClickErase();
        setActiveCell(index, buttonClicked);
      }
    }, [
      disabled,
      index,
      buttonClicked,
      activeCell,
      buttonClickErase,
      setActiveCell,
      setCellValue,
    ]);

    // set value on input
    useEffect(() => {
      if (!disabled) {
        inputRef.current.value = value;
      }
    }, [value, disabled]);

    useEffect(() => {
      if (activeCell === null && buttonClicked !== null) {
        buttonClickErase();
      }
    }, [activeCell, buttonClickErase, buttonClicked]);

    return (
      <input
        type="text"
        className={`EquationGridCell ${
          !disabled && activeCell === index && "is-active"
        } ${state}`}
        maxLength={1}
        pattern={UI_EQUATION_REG_EXP}
        ref={inputRef}
        disabled={disabled}
        onChange={onChange}
        onFocus={onFocus}
        {...props}
      />
    );
  }
);
