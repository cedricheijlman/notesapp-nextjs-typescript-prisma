import React, { useEffect } from "react";
import styles from "./Modal.module.css";
import { NextPage } from "next";
import { useRouter } from "next/router";

interface EditFormData {
  title: string;
  content: string;
  id: string;
}

interface Props {
  editForm: {
    title: string;
    content: string;
    id: string;
  };
  setEditForm: React.Dispatch<React.SetStateAction<EditFormData>>;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: NextPage<Props> = ({ editForm, setEditForm, setEditMode }) => {
  const router = useRouter();

  // handle edit note
  const handleEditNote = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      fetch(`/api/note/${editForm.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editForm.title,
          content: editForm.content,
        }),
        method: "POST",
      }).then((res) => {
        setEditForm({ title: "", id: "", content: "" });
        setEditMode(false);
        router.replace(router.asPath);
        console.log("test");
      });
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <div className={styles.modal}>
      <form onSubmit={handleEditNote}>
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
        <button type="submit">Edit Note</button>
      </form>
    </div>
  );
};

export default Modal;
