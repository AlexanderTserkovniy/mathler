import { fireEvent, render, screen } from "@testing-library/react";
import ThemeSwitcherActivator from "./ThemeSwitcherActivator";

test("renders children wrapped in the <a> tag", () => {
  const { container, getByText } = render(
    <ThemeSwitcherActivator>light</ThemeSwitcherActivator>
  );
  // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
  const element = container.querySelector("a");
  expect(element).toBeInTheDocument();
  // eslint-disable-next-line testing-library/prefer-screen-queries
  expect(getByText("light")).toBeInTheDocument();
});

test("should invoke clicks on handler", () => {
  const handler = jest.fn();
  render(
    <ThemeSwitcherActivator onClick={handler}>light</ThemeSwitcherActivator>
  );
  const themeSwitcherActivator = screen.getByText("light");
  fireEvent.click(themeSwitcherActivator);
  expect(handler).toBeCalled();
});

// TODO Did not manage to achieve this, skipped
xtest("clicks on it must prevent default", () => {
  const preventDefaultHandler = jest.fn();
  const handler = jest.fn();
  const event = {
    preventDefault: preventDefaultHandler,
  };
  render(
    <ThemeSwitcherActivator onClick={handler}>light</ThemeSwitcherActivator>
  );
  const themeSwitcherActivator = screen.getByText("light");
  fireEvent(themeSwitcherActivator, new MouseEvent("click", event));
  expect(preventDefaultHandler).toBeCalled();
});
