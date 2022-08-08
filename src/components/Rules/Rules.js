import "./RulesActivator.scss";
import RulesActivator from "./RulesActivator";
import { useCallback } from "react";
import RulesContent from "./RulesContent";
import RulesHeader from "./RulesHeader";

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

  return <RulesActivator onClick={showRules}>show rules</RulesActivator>;
};

export default Rules;
