import "./App.scss";
import EquationGrid from "../EquationGrid/EquationGrid";
import EquationTask from "../EquationTask/EquationTask";
import AppHeader from "./AppHeader";
import Keyboard from "../Keyboard/Keyboard";
import Popup from "../Popup/Popup.game.enhanced";
import WinLost from "../WinLost/WinLost.game.enhanced";

const App = () => (
  <>
    <div className="App">
      <AppHeader />
      <WinLost />
      <article className="App-body">
        <EquationTask />
        <EquationGrid />
        <Keyboard />
      </article>
    </div>
    <Popup />
  </>
);

export default App;
