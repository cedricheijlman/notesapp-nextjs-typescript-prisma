import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Notes App</h1>
      <form className={styles.form}>
        <label>Note Title</label>
        <input />
        <label>Note Message</label>
        <textarea />
        <button>Add +</button>
      </form>
    </div>
  );
};

export default Home;
