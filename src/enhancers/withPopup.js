import { usePopup } from "../context/popup";

/**
 * Created by Oleksandr Tserkovnyi on 07.08.2022.
 * kemperomg@gmail.com
 */

const withPopup =
  (Component) =>
  ({ ...props }) => {
    const { state, actions } = usePopup();
    return <Component popup={state} {...actions} {...props} />;
  };

export default withPopup;
