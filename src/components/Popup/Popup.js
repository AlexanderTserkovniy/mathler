/**
 * Created by Oleksandr Tserkovnyi on 07.08.2022.
 * kemperomg@gmail.com
 */

import "./Popup.scss";
import { useCallback } from "react";
import Button from "../Button/Button";

const Popup = ({ popup, setPopupContent, onOkCallback }) => {
  const onOk = useCallback(() => {
    setPopupContent(null);
    onOkCallback();
  }, [onOkCallback, setPopupContent]);

  const popupContent = popup.value?.content;
  const popupHeader = popup.value?.header;

  return (
    <section className={`Popup ${popup.value && "is-active"}`}>
      {popup.value && (
        <article className="Popup-content">
          <header className="Popup-content-header">{popupHeader}</header>
          <article>{popupContent}</article>
          <footer>
            <Button onClick={onOk}>OK</Button>
          </footer>
        </article>
      )}
    </section>
  );
};

export default Popup;
