/**
 * Created by Oleksandr Tserkovnyi on 06.08.2022.
 * kemperomg@gmail.com
 */
import { useGame } from "../context/game";

const withGameActions = (actionsToBind) => (Component) => (props) => {
  const { actions } = useGame();
  const mappedActionsAsProps = Object.entries(actionsToBind).reduce(
    (aggr, [mapTo, mapFrom]) => {
      const action = actions[mapFrom];
      if (!action) {
        throw new Error("There is no such action in game actions");
      }
      aggr[mapTo] = action;
      return aggr;
    },
    {}
  );
  return <Component {...mappedActionsAsProps} {...props} />;
};

export default withGameActions;
