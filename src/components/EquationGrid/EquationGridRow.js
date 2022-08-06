import "./EquationGridRow.scss";

export const EquationGridRow = ({ children, ...props }) => (
  <section className="EquationGridRow" {...props}>
    {children}
  </section>
);
