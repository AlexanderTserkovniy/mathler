/**
 * Created by Oleksandr Tserkovnyi on 06.08.2022.
 * kemperomg@gmail.com
 */

import withGameActions from "../../enhancers/withGameActions";
import KeyboardButton from "./KeyboardButton";

export default withGameActions({ onClick: "buttonClick" })(KeyboardButton);
