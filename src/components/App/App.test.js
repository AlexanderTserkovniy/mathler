import { render, screen } from "@testing-library/react";
import App from "./App";
import { ThemeProvider } from "../../context/theme";
import { GameProvider } from "../../context/game";
import { PopupProvider } from "../../context/popup";

test("renders app name", () => {
  render(
    <PopupProvider>
      <ThemeProvider>
        <GameProvider>
          <App />
        </GameProvider>
      </ThemeProvider>
    </PopupProvider>
  );
  const appName = screen.getByText(/Mathler/i);
  expect(appName).toBeInTheDocument();
});
