import { render, screen } from "@testing-library/react";
import App from "./App";
import { ThemeProvider } from "../../context/theme";

test("renders app name", () => {
  render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
  const appName = screen.getByText(/Mathler/i);
  expect(appName).toBeInTheDocument();
});
