import React, { useEffect, useState } from "react";
import styles from "./ProductItem.module.css";
import star from "./image/path.svg";
import { useSelector, useDispatch } from "react-redux";
import { fetchSlideAction } from "../store/fetch-slice";

function ProductItem(props) {
  const user = useSelector((state) => state.fetch.uid);
  const [disabled, setDisabled] = useState(false);
  const dispatchFunction = useDispatch();
  useEffect(() => {
    if (props.item.disabled) setDisabled(true);
  }, []);
  const sendAddedProduct = async () => {
    if (disabled === true) return;
    setDisabled(true);
    await fetch(
      `https://e-commerce-shop-d6bd3-default-rtdb.firebaseio.com/users/${user}/cart.json`,
      {
        method: "POST",
        body: JSON.stringify(props.item),
      }
    )
      .then((data) => {
        console.log("works");
      })
      .catch((err) => console.log(err));
    dispatchFunction(fetchSlideAction.addAmount({ number: 1 }));
  };
  return (
    <li key={props.item.id} className={styles.product}>
      <div className={styles.product__img}>
        <img src={props.item.image} alt="img" />
      </div>
      <span className={styles.product__textbox}>
        <span className={styles.product__rate}>
          <p>{props.item.rating.rate}</p>
          <img src={star} alt="stars" />
        </span>
        <h3>{props.item.title}</h3>
        <h4>{props.item.price}$</h4>
        <em>{props.item.category}</em>
      </span>
      <button
        className={styles.product__btn}
        onClick={sendAddedProduct}
        disabled={disabled}
      >
        {!disabled ? "Add to cart" : "Added"}
      </button>
    </li>
  );
}

export default ProductItem;
