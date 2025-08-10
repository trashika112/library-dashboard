import React, { useState, useEffect } from "react";
import api from "../services/api.js";

export default function SearchBook() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Debounce search input
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const delayDebounceFn = setTimeout(() => {
      api.get(`/books/search/${query}`)
        .then(res => {
          setResults(res.data);
          setError("");
          setLoading(false);
        })
        .catch(err => {
          setError("Failed to fetch results");
          setLoading(false);
        });
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: "1rem" }}>
      <input
        type="text"
        placeholder="Search books by title, author or genre..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && results.length === 0 && query && <p>No results found.</p>}

      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {results.map(book => (
          <li key={book._id} style={{ padding: "0.5rem 0", borderBottom: "1px solid #ddd" }}>
            <strong>{book.title}</strong> by {book.author || "Unknown"} ({book.publishedYear || "N/A"})
          </li>
        ))}
      </ul>
    </div>
  );
}
