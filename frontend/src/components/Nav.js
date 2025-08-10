import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();
  const token = localStorage.getItem("library_token");

  const logout = () => {
    localStorage.removeItem("library_token");
    localStorage.removeItem("library_user");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="nav">
      <div style={{ fontWeight: "700" }}>Library Dashboard</div>
      <div>
        {token ? (
          <>
            <Link to="/books">Books</Link>
            <Link to="/search" style={{ marginLeft: 12 }}>Search Books</Link>
            <Link to="/add-book" style={{ marginLeft: 12 }}>Add Book</Link>
            <button
              onClick={logout}
              className="btn"
              style={{ marginLeft: 12, background: "#d9534f", color: "#fff" }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login" style={{ marginLeft: 12 }}>Login</Link>
          </>
        )}
      </div>
    </div>
  );
}
