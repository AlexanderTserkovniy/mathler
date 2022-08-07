/**
 * Created by Oleksandr Tserkovnyi on 06.08.2022.
 * kemperomg@gmail.com
 */

import "./KeyboardButton.scss";
import { useCallback } from "react";

const KeyboardButton = ({ children, onClick }) => (
  <button
    className="KeyboardButton"
    onClick={useCallback((e) => onClick(children), [children, onClick])}
  >
    {children}
  </button>
);

export default KeyboardButton;
