import Keyboard from "./Keyboard";
import { render, screen } from "@testing-library/react";

describe("`Keyboard` component", () => {
  test("renders keyboard buttons", () => {
    render(<Keyboard />);
    const num0 = screen.getByText(/0/i);
    const num5 = screen.getByText(/5/i);
    const num9 = screen.getByText(/9/i);
    expect(num0).toBeInTheDocument();
    expect(num5).toBeInTheDocument();
    expect(num9).toBeInTheDocument();

    const plus = screen.getByText(/\+/i);
    const minus = screen.getByText(/-/i);
    const multiply = screen.getByText(/\*/i);
    const divide = screen.getByText(/\//i);
    expect(plus).toBeInTheDocument();
    expect(minus).toBeInTheDocument();
    expect(multiply).toBeInTheDocument();
    expect(divide).toBeInTheDocument();

    const enter = screen.getByText(/> Enter/i);
    const deleteBtn = screen.getByText(/Delete </i);
    const deleteAll = screen.getByText(/x Delete all x/i);
    expect(enter).toBeInTheDocument();
    expect(deleteBtn).toBeInTheDocument();
    expect(deleteAll).toBeInTheDocument();
  });
});
