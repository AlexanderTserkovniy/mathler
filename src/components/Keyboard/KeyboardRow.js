/**
 * Created by Oleksandr Tserkovnyi on 06.08.2022.
 * kemperomg@gmail.com
 */
import KeyboardButton from "./KeyboardButton.game.enhanced";

const KeyboardRow = ({ data }) => (
  <section className="KeyboardRow">
    {data.map((key) => (
      <KeyboardButton key={key}>{key}</KeyboardButton>
    ))}
  </section>
);

export default KeyboardRow;
