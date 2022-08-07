/**
 * Created by Oleksandr Tserkovnyi on 07.08.2022.
 * kemperomg@gmail.com
 */

import "./Popup.scss";
import { useGame } from "../../context/game";
import { useCallback, useEffect, useMemo } from "react";
import Button from "../Button/Button";

const Popup = () => {
  const { state, actions } = useGame();
  const validation = useMemo(() => {
    return state.validation;
  }, [state.validation]);

  useEffect(() => {
    let tmt;
    if (validation?.isValid === false) {
      tmt = setTimeout(() => {
        actions.setValidation(null);
      }, 2000);
    }
    return () => clearTimeout(tmt);
  }, [actions, validation?.isValid]);

  const onOk = useCallback(() => actions.setValidation(null), [actions]);

  return (
    <section
      className={`Popup ${validation?.isValid === false && "is-active"}`}
    >
      {validation && (
        <article className="Popup-content">
          <header className="Popup-content-header">{validation.message}</header>
          <footer>
            <Button onClick={onOk}>OK</Button>
          </footer>
        </article>
      )}
    </section>
  );
};

export default Popup;
