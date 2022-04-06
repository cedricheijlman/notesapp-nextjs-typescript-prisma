import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import styles from "../styles/Home.module.css";

interface FormData {
  title: string;
  content: string;
  id: string;
}

const Home: NextPage = () => {
  const createNote = async (data: FormData) => {
    try {
      if (data.title !== "" && data.content !== "") {
        fetch("http://localhost:3000/api/create", {
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }).then(() => {
          setForm({ title: "", content: "", id: "" });
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [form, setForm] = useState<FormData>({
    title: "",
    content: "",
    id: "",
  });

  const handleForm = (e: React.FormEvent, data: FormData) => {
    e.preventDefault();
    try {
      createNote(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Notes App</h1>
      <form
        onSubmit={(e) => {
          handleForm(e, form);
        }}
        className={styles.form}
      >
        <label>Note Title</label>
        <input
          onChange={(e) => {
            setForm({ ...form, title: e.target.value });
          }}
        />
        <label>Note Message</label>
        <textarea
          onChange={(e) => {
            setForm({ ...form, content: e.target.value });
          }}
        />
        <button type="submit">Add +</button>
      </form>
    </div>
  );
};

export default Home;
