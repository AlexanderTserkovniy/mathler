/**
 * Created by Oleksandr Tserkovnyi on 07.08.2022.
 * kemperomg@gmail.com
 */
import Activator from "../Activator/Activator";
import { useCallback } from "react";

const StartOver = ({ gameRestart }) => {
  const onClick = useCallback(() => {
    gameRestart(new Date().getTime());
  }, [gameRestart]);

  return (
    <Activator action="action:start-over" onClick={onClick}>
      reset game
    </Activator>
  );
};

export default StartOver;
