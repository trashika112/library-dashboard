// src/components/SignUp.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added Link import
import api, { setAuthToken } from "../services/api.js";

export default function SignUp() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMsg("");
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", form);
      localStorage.setItem("library_token", res.data.token);
      localStorage.setItem("library_user", JSON.stringify(res.data.user));
      setAuthToken(res.data.token);
      navigate("/books");
    } catch (err) {
      setMsg(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "1rem" }}>
      <h2>Sign Up</h2>
      <form onSubmit={submit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handle}
          required
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />
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
          Register
        </button>
      </form>
      {msg && <p style={{ color: "red", marginTop: "1rem" }}>{msg}</p>}

      <p style={{ marginTop: "1rem" }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
