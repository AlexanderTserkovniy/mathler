/**
 * Created by Oleksandr Tserkovnyi on 07.08.2022.
 * kemperomg@gmail.com
 */
import StartOver from "./StartOver";
import withGameActions from "../../enhancers/withGameActions";

export default withGameActions({ gameRestart: "gameRestart" })(StartOver);
