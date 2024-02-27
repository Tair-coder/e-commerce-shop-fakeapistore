import React from "react";
import styles from "./Modal.module.css";
function Modal(props) {
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
        <div className={styles.modal__content}>
          {props.children ? props.children : "Add product..."}
        </div>

        <div className={styles.modal__footer}>
          <button>Buy</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
