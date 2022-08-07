import EquationGrid from "./EquationGrid";
import { render, screen, within } from "@testing-library/react";
import { GameProvider } from "../../context/game";

jest.mock("../../context/game", () => ({
  GameProvider: ({ children }) => children,
  useGame: () => ({
    state: {
      // mock for deep components
      buttonClicked: null,
      activeCell: 0,
      cellsValues: [],

      // real data for rendering grid
      rules: {
        tries: 2,
        length: 5,
      },
    },
    actions: {
      buttonClickErase: () => {},
      setActiveCell: () => {},
      setCellValue: () => {},
    },
  }),
}));

describe("EquationGrid component", () => {
  test("should render grid x, y", async () => {
    render(
      <GameProvider>
        <EquationGrid />
      </GameProvider>
    );

    const rows = await screen.findAllByTestId("equation-grid-row");
    const cellsInFirstRow = await within(rows[0]).findAllByTestId(
      "equation-grid-cell"
    );

    expect(rows.length).toEqual(2);
    expect(cellsInFirstRow.length).toEqual(5);
  });
});
