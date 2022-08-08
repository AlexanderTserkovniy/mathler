import withPopup from "../../enhancers/withPopup";
import Rules from "./Rules";
import withGameState from "../../enhancers/withGameState";

/**
 * Created by Oleksandr Tserkovnyi on 07.08.2022.
 * kemperomg@gmail.com
 */

export default withPopup(withGameState(["rules"])(Rules));
