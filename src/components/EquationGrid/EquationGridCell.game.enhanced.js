/**
 * Created by Oleksandr Tserkovnyi on 06.08.2022.
 * kemperomg@gmail.com
 */

import { EquationGridCell } from "./EquationGridCell";
import withGameState from "../../enhancers/withGameState";
import withGameActions from "../../enhancers/withGameActions";

// TODO Compose
export default withGameActions({
  buttonClickErase: "buttonClickErase",
  setActiveCell: "setActiveCell",
  setCellValue: "setCellValue",
})(withGameState(["buttonClicked", "activeCell"])(EquationGridCell));
