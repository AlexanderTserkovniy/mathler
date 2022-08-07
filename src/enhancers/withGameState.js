/**
 * Created by Oleksandr Tserkovnyi on 06.08.2022.
 * kemperomg@gmail.com
 */
import { useGame } from "../context/game";

// TODO Combine with withGameActions.js
const withGameState = (stateToBind) => (Component) => (props) => {
  const { state } = useGame();
  const mappedStateAsProps = stateToBind.reduce((aggr, stateProp) => {
    if (state.hasOwnProperty(stateProp) === false) {
      throw new Error("There is no such state item in game state");
    }
    aggr[stateProp] = state[stateProp];
    return aggr;
  }, {});
  return <Component {...mappedStateAsProps} {...props} />;
};

export default withGameState;
