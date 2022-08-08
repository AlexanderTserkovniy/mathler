/**
 * Created by Oleksandr Tserkovnyi on 07.08.2022.
 * kemperomg@gmail.com
 */
import { useEffect } from "react";

const WinLost = ({ finalResult, setPopupContent }) => {
  useEffect(() => {
    if (finalResult) {
      setPopupContent({
        header: `You ${finalResult}!`,
      });
    }
  }, [finalResult, setPopupContent]);

  return null;
};

export default WinLost;
