/**
 * Created by Oleksandr Tserkovnyi on 06.08.2022.
 * kemperomg@gmail.com
 */

import "./EquationTask.scss";
import { useGame } from "../../context/game";

const EquationTask = () => {
  const { state } = useGame();
  return (
    <header>
      <h2 className="EquationTask-heading">
        <span>Find the hidden calculation that equals </span>
        <span className="EquationTask-number">{state.currentTask.result}</span>
      </h2>
    </header>
  );
};

export default EquationTask;
