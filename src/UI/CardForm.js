import React from "react";
import styles from "./CardForm.module.css";
function CardForm(props) {
  return <div className={styles.form_card}>{props.children}</div>;
}

export default CardForm;
