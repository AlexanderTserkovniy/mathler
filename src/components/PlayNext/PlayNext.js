/**
 * Created by Oleksandr Tserkovnyi on 07.08.2022.
 * kemperomg@gmail.com
 */
import Activator from "../Activator/Activator";
import { useCallback } from "react";
import equations from "../../config/equations";

const PlayNext = ({ gameRestart, setNextChallenge }) => {
  const onClick = useCallback(() => {
    const currentEquationIndex = Number(
      localStorage.getItem("currentEquationIndex") || 0
    );
    const next =
      currentEquationIndex + 1 > equations.equations.length - 1
        ? 0
        : currentEquationIndex + 1;
    localStorage.setItem("currentEquationIndex", next);
    gameRestart(new Date().getTime());
    setNextChallenge(equations.equations[next]);
  }, [gameRestart, setNextChallenge]);

  return (
    <Activator action="action:play-next" onClick={onClick}>
      play next
    </Activator>
  );
};

export default PlayNext;
