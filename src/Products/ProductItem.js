import React from "react";
import styles from "./ProductItem.module.css";
import star from "./image/path.svg";
function ProductItem(props) {
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
        {/* <p>{props.item.description}</p> */}
        <em>{props.item.category}</em>
      </span>
      <button className={styles.product__btn}>Add to cart</button>
    </li>
  );
}

export default ProductItem;
