import React from "react";
import { Link } from "react-router-dom";
import ThemeToggleButton from "../ThemeToggleButton/ThemeToggleButton";
import styles from "./styles.module.scss";

const NavLinks = () => {
  return (
    <div className={styles.navlinks}>
      <ul>
        <Link to="jonathan-marciano-21-03-22">
          <li>Home</li>
        </Link>
        <Link to="/favorites/">
          <li>Favorites</li>
        </Link>
      </ul>
      <ThemeToggleButton />
    </div>
  );
};

export default NavLinks;
