import WinLost from "./WinLost";
import withGameState from "../../enhancers/withGameState";
import withPopup from "../../enhancers/withPopup";

/**
 * Created by Oleksandr Tserkovnyi on 07.08.2022.
 * kemperomg@gmail.com
 */

export default withGameState(["finalResult"])(withPopup(WinLost));
