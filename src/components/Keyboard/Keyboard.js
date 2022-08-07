/**
 * Created by Oleksandr Tserkovnyi on 06.08.2022.
 * kemperomg@gmail.com
 */

import "./KeyboardButton.scss";
import "./Keyboard.scss";
import KeyboardRow from "./KeyboardRow";

export const KEYBOARD_KEYS_NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export const KEYBOARD_KEYS_OPERATORS = ["+", "-", "*", "/"];

export const KEYBOARD_KEYS_ACTIONS = ["> Enter", "Delete <", "x Delete all x"];

const Keyboard = () => (
  <section className="Keyboard">
    <KeyboardRow data={KEYBOARD_KEYS_NUMBERS} />
    <KeyboardRow data={KEYBOARD_KEYS_OPERATORS} />
    <KeyboardRow data={KEYBOARD_KEYS_ACTIONS} />
  </section>
);

export default Keyboard;
