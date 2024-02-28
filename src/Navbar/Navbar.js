import React from "react";
import styles from "./Navbar.module.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchSlideAction } from "../store/fetch-slice";
function Navbar(props) {
  const history = useHistory();
  const cartAmount = useSelector((state) => state.fetch.cartAmount);
  const dispatchFunction = useDispatch();
  const signoutHandler = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    history.push("/login");
    const num = +cartAmount;
    dispatchFunction(fetchSlideAction.addAmount({ number: -num }));
  };

  return (
    <div className={styles.navbar__relative}>
      <div className={styles.navbar}>
        <button className={styles.navbar__signout} onClick={signoutHandler}>
          Sign Out
        </button>
        <h1 className={styles.navbar__logo}>logo</h1>
        <span className={styles.navbar__cartBtn}>
          <button onClick={() => props.setActiveModal(true)}>Cart</button>
          <p>{cartAmount}</p>
        </span>
      </div>
    </div>
  );
}

export default Navbar;
