import React, { useState } from "react";
import api from "../services/api.js";
import { useNavigate } from "react-router-dom";

export default function AddBook() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    publishedYear: "",
    copies: 1,
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handle = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
    setMsg("");
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const bookData = {
        ...book,
        publishedYear: Number(book.publishedYear),
        copies: Number(book.copies),
      };

      await api.post("/books/add", bookData);
      navigate("/books");
    } catch (err) {
      setMsg(err.response?.data?.error || "Failed to add book");
    }
  };

  return (
    <div className="card" style={{ maxWidth: "400px", margin: "auto", padding: "1rem" }}>
      <h2>Add Book</h2>
      <form onSubmit={submit}>
        <input
          className="input"
          name="title"
          placeholder="Title"
          value={book.title}
          onChange={handle}
          required
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />
        <input
          className="input"
          name="author"
          placeholder="Author"
          value={book.author}
          onChange={handle}
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />
        <input
          className="input"
          name="publishedYear"
          placeholder="Published Year"
          type="number"
          value={book.publishedYear}
          onChange={handle}
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />
        <input
          className="input"
          name="copies"
          placeholder="Copies"
          type="number"
          min="1"
          max="10"
          value={book.copies}
          onChange={handle}
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />
        <button
          className="btn btn-primary"
          type="submit"
          style={{ width: "100%", padding: "0.75rem" }}
        >
          Add Book
        </button>
      </form>
      {msg && <p style={{ color: "red", marginTop: "1rem" }}>{msg}</p>}
    </div>
  );
}
