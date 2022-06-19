import React, { useContext } from "react";
import { ThemeContext } from "../../App";

import { CgSun } from "react-icons/cg";
import { HiMoon } from "react-icons/hi";

import styles from "./styles.module.scss";

const ThemeToggleButton = () => {
  const { isDarkMode, toggleMode } = useContext(ThemeContext);

  const modeButtonContent = (
    <div className={styles.modeDiv}>
      {isDarkMode ? <CgSun size={20} /> : <HiMoon size={20} />}
      {isDarkMode ? <span>Light mode</span> : <span>Dark mode</span>}
    </div>
  );

  return (
    <button className={styles.modeButton} onClick={toggleMode}>
      {modeButtonContent}
    </button>
  );
};

export default ThemeToggleButton;
