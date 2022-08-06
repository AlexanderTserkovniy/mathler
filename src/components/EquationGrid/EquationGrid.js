import { EquationGridCell } from "./EquationGridCell";
import { EquationGridRow } from "./EquationGridRow";

const EquationGrid = ({ x, y }) => (
  <section>
    {new Array(y).fill(1).map((_, inxRow) => {
      const cells = new Array(x).fill(1);
      return (
        <EquationGridRow key={inxRow} data-testid="equation-grid-row">
          {cells.map((_, inxCell) => (
            <EquationGridCell
              key={inxRow + inxCell}
              data-testid="equation-grid-cell"
            />
          ))}
        </EquationGridRow>
      );
    })}
  </section>
);

export default EquationGrid;
