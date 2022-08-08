/**
 * Created by Oleksandr Tserkovnyi on 07.08.2022.
 * kemperomg@gmail.com
 */

import "./Popup.scss";
import { useCallback, useEffect } from "react";
import Popup from "./Popup";

// TODO Remove it, it is bad solution
const PopupValidationWrapper = ({ validation, ...props }) => {
  useEffect(() => {
    if (validation && !props.popup.value) {
      props.setPopupContent({
        header: validation.message,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.popup.value, props.setPopupContent, validation]);

  const onOkCallback = useCallback(() => {
    if (validation) {
      props.setValidation(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.setValidation, validation]);

  return <Popup onOkCallback={onOkCallback} {...props} />;
};

export default PopupValidationWrapper;
