const express = require("express");
const Book = require("../db/Book"); // Your Mongoose Book model
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (!token) return res.status(403).send({ error: "Token required" });

  // Token format: "Bearer <token>"
  token = token.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ error: "Invalid token" });
    req.userId = decoded.id;
    next();
  });
}

// Create a new book
router.post("/add", verifyToken, async (req, res) => {
  try {
    let book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).send(savedBook);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Get all books
router.get("/", verifyToken, async (req, res) => {
  try {
    const books = await Book.find();
    res.send(books);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Get a book by id
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send({ error: "Book not found" });
    res.send(book);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Update a book by id
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedBook) return res.status(404).send({ error: "Book not found" });
    res.send(updatedBook);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Delete a book by id
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).send({ error: "Book not found" });
    res.send({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Search books by title, author, or genre
router.get("/search/:key", verifyToken, async (req, res) => {
  try {
    const key = req.params.key;
    const results = await Book.find({
      $or: [
        { title: { $regex: key, $options: "i" } },
        { author: { $regex: key, $options: "i" } },
        { genre: { $regex: key, $options: "i" } }
      ]
    });
    res.send(results);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
