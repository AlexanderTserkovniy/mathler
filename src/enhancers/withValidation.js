import { useGame } from "../context/game";
import { useEffect, useMemo } from "react";
import { usePopup } from "../context/popup";

/**
 * Created by Oleksandr Tserkovnyi on 07.08.2022.
 * kemperomg@gmail.com
 */

const withValidation =
  (shouldRemovePopup = false) =>
  (Component) =>
  ({ ...props }) => {
    const { state, actions } = useGame();
    const { actions: popupActions } = usePopup();
    const validation = useMemo(() => state.validation, [state.validation]);

    useEffect(() => {
      let tmt;
      if (validation?.isValid === false) {
        tmt = setTimeout(() => {
          actions.setValidation(null);
          // TODO Might be not needed inside other places except popup
          shouldRemovePopup && popupActions.setPopupContent(null);
        }, 2000);
      }
      return () => clearTimeout(tmt);
    }, [actions, popupActions, validation?.isValid]);

    return <Component validation={validation} {...props} />;
  };

export default withValidation;
