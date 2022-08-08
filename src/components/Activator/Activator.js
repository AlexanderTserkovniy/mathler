/**
 * Created by Oleksandr Tserkovnyi on 07.08.2022.
 * kemperomg@gmail.com
 */

import "./Activator.scss";
import { usePreventDefault } from "../../hooks/usePreventDefault";

const Activator = ({ action = "action:some", children, onClick, ...props }) => (
  <a
    href={action}
    className="Activator"
    onClick={usePreventDefault(onClick)}
    {...props}
  >
    {children}
  </a>
);

export default Activator;
