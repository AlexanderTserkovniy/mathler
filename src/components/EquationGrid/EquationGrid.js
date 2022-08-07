import EquationGridCell from "./EquationGridCell.game.enhanced";
import { EquationGridRow } from "./EquationGridRow";
import { useGame } from "../../context/game";

const EquationGrid = () => {
  const { state } = useGame();
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
                index={inxCell}
                value={state.cellsValues[inxCell]}
                disabled={inxRow !== activeRow}
                data-testid="equation-grid-cell"
                state={
                  state.history?.[inxRow]
                    ? state.history[inxRow][inxCell].state
                    : null
                }
              />
            ))}
          </EquationGridRow>
        );
      })}
    </section>
  );
};

export default EquationGrid;
