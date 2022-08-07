import { EquationGridCell } from "./EquationGridCell";
import { EquationGridRow } from "./EquationGridRow";
import { useGame } from "../../context/game";

const EquationGrid = () => {
  const { state, actions } = useGame();
  const y = state.rules.tries;
  const x = state.rules.length;
  const activeRow = state.activeRow;

  return (
    <section>
      {new Array(y).fill(1).map((_, inxRow) => {
        const cells = new Array(x).fill(1);
        return (
          <EquationGridRow key={inxRow} data-testid="equation-grid-row">
            {cells.map((_, inxCell) => (
              <EquationGridCell
                key={inxRow + inxCell}
                disabled={inxRow !== activeRow}
                data-testid="equation-grid-cell"
              />
            ))}
          </EquationGridRow>
        );
      })}
    </section>
  );
};

export default EquationGrid;
