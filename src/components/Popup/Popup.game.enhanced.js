/**
 * Created by Oleksandr Tserkovnyi on 07.08.2022.
 * kemperomg@gmail.com
 */

import "./Popup.scss";
import withGameActions from "../../enhancers/withGameActions";
import withGameState from "../../enhancers/withGameState";
import withValidation from "../../enhancers/withValidation";
import PopupValidationWrapper from "./PopupValidationWrapper";
import withPopup from "../../enhancers/withPopup";

export default withGameActions({
  setValidation: "setValidation",
})(
  withGameState(["validation"])(
    withValidation(true)(withPopup(PopupValidationWrapper))
  )
);
