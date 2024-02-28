import React, { useEffect, useState } from "react";
import styles from "./Modal.module.css";
import { useSelector } from "react-redux";
function Modal(props) {
  const [cartData, setCartData] = useState();
  const user = useSelector((state) => state.fetch.uid);
  useEffect(() => {
    const getCartData = async () => {
      await fetch(
        `https://e-commerce-shop-d6bd3-default-rtdb.firebaseio.com/users/${user}/cart.json`
      )
        .then((data) => data.json())
        .then((res) => {
          const arr = [];
          for (const key of Object.values(res)) {
            arr.push(key);
            // console.log(key.id);
            // console.log(res);
          }
          setCartData(arr);
        });
    };
    getCartData();
  }, []);
  const removeCartHandler = (id) => {
    // const data = cartData;
    // const v = data.filter((item) => item.id !== id);
    // console.log(v);
    setCartData((prevVal) => prevVal.filter((item) => item.id !== id));
  };
  return (
    <div className={styles.modal}>
      <div className={styles.bg}></div>
      <div className={styles.container}>
        <div className={styles.modal__header}>
          <span>
            <h2>Cart</h2>
            <button
              className={styles.modal__cancelBtn}
              onClick={() => props.setActiveModal(false)}
            >
              X
            </button>
          </span>
        </div>
        <hr />
        <ul className={styles.modal__content}>
          {cartData
            ? cartData.map((item) => {
                return (
                  <li key={item.id} className={styles.modal__content__item}>
                    <p>{item.title}</p>{" "}
                    <button onClick={() => removeCartHandler(item.id)}>
                      X
                    </button>
                  </li>
                );
              })
            : "Add product..."}
        </ul>

        <div className={styles.modal__footer}>
          <button>Buy</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
