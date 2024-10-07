import React from "react";
import styles from "./style.module.css";
const Spinner = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Spinner;
