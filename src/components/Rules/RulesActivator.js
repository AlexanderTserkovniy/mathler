import { usePreventDefault } from "../../hooks/usePreventDefault";
import "./RulesActivator.scss";

/**
 * Created by Oleksandr Tserkovnyi on 07.08.2022.
 * kemperomg@gmail.com
 */

export const RulesActivator = ({ onClick, children }) => {
  return (
    <a
      href="action:show-rules"
      className="RulesActivator"
      onClick={usePreventDefault(onClick)}
    >
      {children}
    </a>
  );
};

export default RulesActivator;
