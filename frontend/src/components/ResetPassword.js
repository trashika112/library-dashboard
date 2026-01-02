// src/components/ResetPassword.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [msg, setMsg] = useState("");

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMsg("");
  };

  const submit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMsg("Passwords do not match!");
      return;
    }

    try {
      // Replace this with your backend API endpoint
      await api.post("/auth/reset-password", {
        email: form.email,
        password: form.password
      });

      setMsg("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMsg(err.response?.data?.error || "Password reset failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "1rem" }}>
      <h2>Reset Password</h2>
      <form onSubmit={submit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handle}
          required
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />
        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={form.password}
          onChange={handle}
          required
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handle}
          required
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />
        <button type="submit" style={{ width: "100%", padding: "0.75rem" }}>
          Reset Password
        </button>
      </form>
      {msg && (
        <p style={{ color: msg.includes("successful") ? "green" : "red", marginTop: "1rem" }}>
          {msg}
        </p>
      )}
    </div>
  );
}
