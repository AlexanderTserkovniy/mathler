/**
 * Created by Oleksandr Tserkovnyi on 07.08.2022.
 * kemperomg@gmail.com
 */

import "./Button.scss";

const Button = ({ children, ...props }) => (
  <button className="Button" {...props}>
    {children}
  </button>
);

export default Button;
