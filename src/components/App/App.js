import logo from "../../logo.svg";
import "./App.scss";
import calculate from "../../services/calculate/calculate";
import EquationGrid from "../EquationGrid/EquationGrid";

const App = () => (
  <div className="App">
    <header className="App-header" title="This project uses React.js">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-name">Mathler</h1>
    </header>
    <article className="App-body">
      <header>
        <p>Find the hidden calculation that equals {}</p>
      </header>

      <section>
        <EquationGrid length={6} tries={6} />
      </section>

      <p>Hardcoded example:</p>
      <code>10/2+9</code>
      <p>result:</p>
      <code>{calculate("10/2+9")}</code>
      <br />
      <code>{calculate("90*5-1")}</code>
      <br />
      <code>{calculate("-9*2/1")}</code>
      <br />
      <code>{calculate("-3+2/8")}</code>
    </article>
  </div>
);

export default App;
