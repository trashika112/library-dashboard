import React, { useState, useEffect } from "react";
import api from "../services/api.js";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    publishedYear: "",
    copies: 1,
  });
  const [msg, setMsg] = useState("");

  // Fetch existing book details
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await api.get(`/books/${id}`);
        const { title, author, publishedYear, copies } = res.data;
        setBook({
          title: title || "",
          author: author || "",
          publishedYear: publishedYear || "",
          copies: copies || 1,
        });
      } catch (err) {
        setMsg("Failed to load book details");
      }
    };

    fetchBook();
  }, [id]);

  const handle = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
    setMsg("");
  };

  // Update book handler
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedBook = {
        ...book,
        publishedYear: Number(book.publishedYear),
        copies: Number(book.copies),
      };
      await api.put(`/books/${id}`, updatedBook);
      navigate("/books");
    } catch (err) {
      setMsg(err.response?.data?.error || "Failed to update book");
    }
  };

  // Delete book handler
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await api.delete(`/books/${id}`);
        navigate("/books");
      } catch (err) {
        setMsg(err.response?.data?.error || "Failed to delete book");
      }
    }
  };

  return (
    <div className="card" style={{ maxWidth: "400px", margin: "auto", padding: "1rem" }}>
      <h2>Edit Book</h2>
      <form onSubmit={handleUpdate}>
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
          style={{ width: "100%", padding: "0.75rem", marginBottom: "1rem" }}
        >
          Update Book
        </button>
      </form>
      <button
        className="btn btn-danger"
        onClick={handleDelete}
        style={{ width: "100%", padding: "0.75rem" }}
      >
        Delete Book
      </button>
      {msg && <p style={{ color: "red", marginTop: "1rem" }}>{msg}</p>}
    </div>
  );
}
