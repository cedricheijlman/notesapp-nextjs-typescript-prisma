import type { NextPage, GetServerSideProps } from "next";
import { prisma } from "../lib/prisma";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Modal from "../components/modal";

interface AllNotes {
  allNotes: {
    id: string;
    title: string;
    content: string;
  }[];
}

interface FormData {
  title: string;
  content: string;
  id: string;
}

const Home = ({ allNotes }: AllNotes) => {
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

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
          refreshData();
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      fetch(`http://localhost:3000/api/note/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }).then(() => {
        refreshData();
      });
    } catch (error) {
      console.log("error deleting note");
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
    <>
      {false && <Modal />}
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
            value={form.title}
            onChange={(e) => {
              setForm({ ...form, title: e.target.value });
            }}
          />
          <label>Note Message</label>
          <textarea
            value={form.content}
            onChange={(e) => {
              setForm({ ...form, content: e.target.value });
            }}
          />
          <button type="submit">Add +</button>
        </form>
        <div className={styles.allTodos}>
          <ul>
            {allNotes?.map((note) => {
              return (
                <li key={note.id}>
                  <div>
                    <h1>{note.title}</h1>
                    <p>{note.content}</p>
                  </div>
                  <div>
                    <button>Edit</button>
                    <button
                      onClick={() => {
                        deleteNote(note.id);
                      }}
                      className={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const allNotes = await prisma.note.findMany({
    select: {
      title: true,
      content: true,
      id: true,
    },
  });

  return {
    props: {
      allNotes,
    },
  };
};
