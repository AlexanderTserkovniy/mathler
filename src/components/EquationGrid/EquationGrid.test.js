import EquationGrid from "./EquationGrid";
import { render, screen, within } from "@testing-library/react";

jest.mock("../../context/game", () => ({
  useGame: () => ({
    state: {
      rules: {
        tries: 2,
        length: 5,
      },
    },
  }),
}));

describe("EquationGrid component", () => {
  test("should render grid x, y", async () => {
    render(<EquationGrid />);

    const rows = await screen.findAllByTestId("equation-grid-row");
    const cellsInFirstRow = await within(rows[0]).findAllByTestId(
      "equation-grid-cell"
    );

    expect(rows.length).toEqual(2);
    expect(cellsInFirstRow.length).toEqual(5);
  });
});
