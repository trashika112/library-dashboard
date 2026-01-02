// src/components/Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added Link import
import api, { setAuthToken } from "../services/api.js";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMsg("");
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("library_token", res.data.token);
      localStorage.setItem("library_user", JSON.stringify(res.data.user));
      setAuthToken(res.data.token);
      navigate("/books");
      window.location.reload(); // optional, you may remove if you don't want a full reload
    } catch (err) {
      setMsg(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "1rem" }}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handle}
          required
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={handle}
          required
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />
        <button type="submit" style={{ width: "100%", padding: "0.75rem" }}>
          Login
        </button>
      </form>
      {msg && <p style={{ color: "red", marginTop: "1rem" }}>{msg}</p>}
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
      <p>
        <Link to="/reset-password">Forgot Password?</Link>
      </p>
    </div>
  );
}
