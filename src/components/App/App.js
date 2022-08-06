import "./App.scss";
import calculate from "../../services/calculate/calculate";
import EquationGrid from "../EquationGrid/EquationGrid";
import EquationTask from "../EquationTask/EquationTask";
import AppHeader from "./AppHeader";

const App = () => (
  <div className="App">
    <AppHeader />
    <article className="App-body">
      <EquationTask />

      <section>
        <EquationGrid x={6} y={6} />
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
