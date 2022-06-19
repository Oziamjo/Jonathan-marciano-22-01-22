import React from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";

import styles from "./styles.module.scss";
import NavLinks from "../NavLinks/NavLinks";

function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <TiWeatherPartlySunny size={20} />
        <span>Weather</span>
      </div>
      <NavLinks />
    </nav>
  );
}

export default Nav;
