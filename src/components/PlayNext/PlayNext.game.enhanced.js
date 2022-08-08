/**
 * Created by Oleksandr Tserkovnyi on 07.08.2022.
 * kemperomg@gmail.com
 */
import PlayNext from "./PlayNext";
import withGameActions from "../../enhancers/withGameActions";

export default withGameActions({
  gameRestart: "gameRestart",
  setNextChallenge: "setNextChallenge",
})(PlayNext);
