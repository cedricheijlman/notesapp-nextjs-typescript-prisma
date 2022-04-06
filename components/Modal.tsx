import React from "react";
import styles from "./Modal.module.css";

const Modal = () => {
  return (
    <div className={styles.modal}>
      <form>
        <div className={styles.modalHeader}>
          <h1>Edit Note</h1>
          <button>X</button>
        </div>

        <label>Note Title </label>
        <input />
        <label>Note Message</label>
        <textarea />
        <button>Edit Note</button>
      </form>
    </div>
  );
};

export default Modal;
