import { render, screen } from "@testing-library/react";
import App from "./App";
import { ThemeProvider } from "../../context/theme";
import { GameProvider } from "../../context/game";

test("renders app name", () => {
  render(
    <ThemeProvider>
      <GameProvider>
        <App />
      </GameProvider>
    </ThemeProvider>
  );
  const appName = screen.getByText(/Mathler/i);
  expect(appName).toBeInTheDocument();
});
