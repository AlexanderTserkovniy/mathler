/**
 * Created by Oleksandr Tserkovnyi on 06.08.2022.
 * kemperomg@gmail.com
 */
import "./ThemeSwitcherActivator.scss";
import { usePreventDefault } from "../../hooks/usePreventDefault";

// noinspection HtmlUnknownTarget
const ThemeSwitcherActivator = ({ children, onClick }) => (
  <a
    href="action:switch-theme"
    className="ThemeSwitcherActivator"
    onClick={usePreventDefault(onClick)}
  >
    {children}
  </a>
);

export default ThemeSwitcherActivator;
