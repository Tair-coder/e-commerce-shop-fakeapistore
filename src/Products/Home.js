import React, { useState } from "react";
import Modal from "../UI/Modal";
import Products from "./Products";
import Navbar from "../Navbar/Navbar";
import styles from "./Home.module.css";
function Home() {
  const [activeModal, setActiveModal] = useState(false);
  return (
    <div
      className={styles.home}
      style={{ overflow: `${activeModal ? "hidden" : "auto"}` }}
    >
      {activeModal && <Modal setActiveModal={setActiveModal} />}
      <Navbar setActiveModal={setActiveModal} />
      <Products />
    </div>
  );
}

export default Home;
