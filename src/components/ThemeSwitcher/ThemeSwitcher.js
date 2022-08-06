/**
 * Created by Oleksandr Tserkovnyi on 06.08.2022.
 * kemperomg@gmail.com
 */
import ThemeSwitcherActivator from "./ThemeSwitcherActivator";
import { useTheme } from "../../context/theme";
import { useCallback, useEffect } from "react";
import { THEME } from "../../common/js/constants";

const ThemeSwitcher = () => {
  const theme = useTheme();
  const toggleTheme = useCallback(() => {
    theme.actions.toggleTheme(
      theme.state.value === THEME.dark ? THEME.light : THEME.dark
    );
  }, [theme.actions, theme.state.value]);

  useEffect(() => {
    theme.sideEffects.addBodyClasses(theme.state.value);
  }, [theme.sideEffects, theme.state.value]);

  // noinspection HtmlUnknownTarget
  return (
    <ThemeSwitcherActivator onClick={toggleTheme}>
      {theme.state.value === THEME.dark ? THEME.light : THEME.dark}
    </ThemeSwitcherActivator>
  );
};

export default ThemeSwitcher;
