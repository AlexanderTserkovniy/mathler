import { useCallback } from "react";
import RulesContent from "./RulesContent";
import RulesHeader from "./RulesHeader";
import Activator from "../Activator/Activator";

/**
 * Created by Oleksandr Tserkovnyi on 07.08.2022.
 * kemperomg@gmail.com
 */

export const Rules = ({ rules, popup, setPopupContent }) => {
  const tries = rules.tries;
  const showRules = useCallback(() => {
    setPopupContent({
      header: <RulesHeader />,
      content: <RulesContent tries={tries} />,
    });
  }, [setPopupContent, tries]);

  return (
    <Activator action="action:show-rules" onClick={showRules}>
      show rules
    </Activator>
  );
};

export default Rules;
