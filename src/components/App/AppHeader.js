import logo from "../../logo.svg";
import "./AppHeader.scss";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";

const AppHeader = () => (
  <section className="AppHeader" title="This project uses React.js">
    <img src={logo} className="AppHeader-logo" alt="logo" />
    {/* TODO Align it properly */}
    <h1 className="AppHeader-name">Mathler</h1>
    <ThemeSwitcher />
  </section>
);

export default AppHeader;
