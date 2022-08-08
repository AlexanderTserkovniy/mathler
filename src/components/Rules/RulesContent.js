import "./RulesContent.scss";
import { EquationGridCell } from "../EquationGrid/EquationGridCell";

/**
 * Created by Oleksandr Tserkovnyi on 07.08.2022.
 * kemperomg@gmail.com
 */

export const RulesContent = ({ tries }) => {
  return (
    <section className="RulesContent">
      <p>How to play Mathler</p>
      <p>Try to find the hidden calculation in {tries} guesses!</p>
      <p>
        After each guess, the color of the tiles will change to show how close
        you are to the solution.
      </p>

      <EquationGridCell disabled historyValue={5} state="valid" />
      <EquationGridCell disabled historyValue={0} state="invalid" />
      <EquationGridCell disabled historyValue={"/"} state="valid" />
      <EquationGridCell disabled historyValue={5} state="almost" />
      <EquationGridCell disabled historyValue={"-"} state="invalid" />
      <EquationGridCell disabled historyValue={2} state="invalid" />

      <ul>
        <li>Green are in the correct place.</li>
        <li>Yellow are in the solution, but in a different place.</li>
        <li>Red are not in the solution.</li>
      </ul>

      <p>Additional rules</p>
      <ul>
        <li>Numbers and operators can appear multiple times.</li>
        <li>Calculate / or * before - or + (order of operations).</li>
      </ul>
    </section>
  );
};

export default RulesContent;
