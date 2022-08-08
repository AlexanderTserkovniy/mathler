/**
 * Created by Oleksandr Tserkovnyi on 06.08.2022.
 * kemperomg@gmail.com
 */

import "./KeyboardButton.scss";
import { useCallback, useEffect } from "react";
import { isOperatorOrIsNumber } from "../../common/js/utils";

const KeyboardButton = ({ children, onClick }) => {
  // TODO Move it from component
  useEffect(() => {
    const fireKey = (e) => {
      if (isOperatorOrIsNumber(e.key)) {
        e.preventDefault();
        return onClick(e.key);
      }

      if (e.keyCode === 13) {
        e.preventDefault();
        return onClick("> Enter");
      }

      if (e.keyCode === 8 || e.keyCode === 46) {
        e.preventDefault();
        return onClick("Delete <");
      }
    };
    window.addEventListener("keydown", fireKey);
    return () => window.removeEventListener("keydown", fireKey);
  }, [onClick]);

  return (
    <button
      className="KeyboardButton"
      onClick={useCallback((e) => onClick(children), [children, onClick])}
    >
      {children}
    </button>
  );
};

export default KeyboardButton;
