import React, { useEffect, useState } from "react";
import api from "../services/api.js";
import { Link } from "react-router-dom";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [msg, setMsg] = useState("");

  const fetchBooks = async () => {
    try {
      const res = await api.get("/books");
      setBooks(res.data || []);
      setMsg(""); // clear error message on success
    } catch (err) {
      console.error("Error fetching books:", err);
      setMsg("Failed to fetch books");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="card">
      <h2>Book List</h2>

      {/* Show error only if no books */}
      {msg && books.length === 0 && (
        <p style={{ color: "red" }}>{msg}</p>
      )}

      {books.length === 0 && !msg && <p>No books available.</p>}

      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <Link to={`/update/${book._id}`}>
              {book.title} by {book.author || "Unknown"} ({book.publishedYear || "N/A"}) - Copies: {book.copies || 0}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
