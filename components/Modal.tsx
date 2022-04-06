import React, { useEffect } from "react";
import styles from "./Modal.module.css";
import { NextPage } from "next";

interface EditFormData {
  title: string;
  content: string;
}

interface Props {
  editForm: {
    title: string;
    content: string;
  };
  setEditForm: React.Dispatch<React.SetStateAction<EditFormData>>;
}

const Modal: NextPage<Props> = ({ editForm, setEditForm }) => {
  return (
    <div className={styles.modal}>
      <form>
        <div className={styles.modalHeader}>
          <h1>Edit Note</h1>
          <button>X</button>
        </div>

        <label>Note Title </label>
        <input
          onChange={(e) => {
            setEditForm({ ...editForm, title: e.target.value });
          }}
          value={editForm.title}
        />
        <label>Note Message</label>
        <textarea
          onChange={(e) => {
            setEditForm({ ...editForm, content: e.target.value });
          }}
          value={editForm.content}
        />
        <button>Edit Note</button>
      </form>
    </div>
  );
};

export default Modal;
