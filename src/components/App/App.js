import "./App.scss";
import EquationGrid from "../EquationGrid/EquationGrid";
import EquationTask from "../EquationTask/EquationTask";
import AppHeader from "./AppHeader";
import Keyboard from "../Keyboard/Keyboard";
import Popup from "../Popup/Popup.game.enhanced";
import WinLost from "../WinLost/WinLost.game.enhanced";
import Rules from "../Rules/Rules.game.popup.enhanced";

const App = () => (
  <>
    <div className="App">
      <header>
        <AppHeader />
        <WinLost />
      </header>
      <article className="App-body">
        <EquationTask />
        <EquationGrid />
        <Keyboard />
      </article>
      <footer>
        <Rules />
      </footer>
    </div>
    <Popup />
  </>
);

export default App;
