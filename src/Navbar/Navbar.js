import React from "react";
import styles from "./Navbar.module.css";
function Navbar(props) {
  return (
    <div className={styles.navbar}>
      <button className={styles.navbar__signout}>Sign Out</button>
      <h1 className={styles.navbar__logo}>logo</h1>
      <span className={styles.navbar__cartBtn}>
        <button onClick={() => props.setActiveModal(true)}>Cart</button>
        <p>0</p>
      </span>
    </div>
  );
}

export default Navbar;
