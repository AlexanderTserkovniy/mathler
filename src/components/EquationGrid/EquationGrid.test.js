import EquationGrid from "./EquationGrid";
import { render, screen, within } from "@testing-library/react";

describe("EquationGrid component", () => {
  test("should render grid x, y", async () => {
    render(<EquationGrid x={6} y={2} />);

    const rows = await screen.findAllByTestId("equation-grid-row");
    const cellsInFirstRow = await within(rows[0]).findAllByTestId(
      "equation-grid-cell"
    );

    expect(rows.length).toEqual(2);
    expect(cellsInFirstRow.length).toEqual(6);
  });
});
