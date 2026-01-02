import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ResetPassword from "./components/ResetPassword"; // <-- Reset page for email + new password
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import UpdateBook from "./components/UpdateBook";
import SearchBook from "./components/SearchBook";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import PrivateComponent from "./components/PrivateComponent";
import { setAuthToken } from "./services/api";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("library_token");
    setAuthToken(token);
  }, []);

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          {/* Default route */}
          <Route path="/" element={<Navigate to="/books" replace />} />

          {/* Public routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          
          {/* Forgot / Reset Password */}
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* Optional token-based route if implemented later */}
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Private routes */}
          <Route element={<PrivateComponent />}>
            <Route path="/books" element={<BookList />} />
            <Route path="/search" element={<SearchBook />} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/update/:id" element={<UpdateBook />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
