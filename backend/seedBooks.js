// seedBooks.js
const mongoose = require("mongoose");
const Book = require("./db/Book");
require("dotenv").config();

const sampleBooks = [
  { title: "To Kill a Mockingbird", author: "Harper Lee", publishedYear: 1960, copies: 5 },
  { title: "1984", author: "George Orwell", publishedYear: 1949, copies: 7 },
  { title: "Pride and Prejudice", author: "Jane Austen", publishedYear: 1813, copies: 4 },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", publishedYear: 1925, copies: 6 },
  { title: "Moby Dick", author: "Herman Melville", publishedYear: 1851, copies: 3 },
  { title: "The Catcher in the Rye", author: "J.D. Salinger", publishedYear: 1951, copies: 8 },
  { title: "The Hobbit", author: "J.R.R. Tolkien", publishedYear: 1937, copies: 10 },
  { title: "Fahrenheit 451", author: "Ray Bradbury", publishedYear: 1953, copies: 6 },
  { title: "Jane Eyre", author: "Charlotte Brontë", publishedYear: 1847, copies: 5 },
  { title: "Brave New World", author: "Aldous Huxley", publishedYear: 1932, copies: 4 },
  { title: "Wuthering Heights", author: "Emily Brontë", publishedYear: 1847, copies: 3 },
  { title: "Animal Farm", author: "George Orwell", publishedYear: 1945, copies: 7 },
  { title: "Lord of the Flies", author: "William Golding", publishedYear: 1954, copies: 6 },
  { title: "The Odyssey", author: "Homer", publishedYear: -800, copies: 2 },
  { title: "The Iliad", author: "Homer", publishedYear: -750, copies: 2 },
  { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", publishedYear: 1997, copies: 15 },
  { title: "The Chronicles of Narnia", author: "C.S. Lewis", publishedYear: 1950, copies: 12 },
  { title: "The Lord of the Rings", author: "J.R.R. Tolkien", publishedYear: 1954, copies: 9 },
  { title: "The Kite Runner", author: "Khaled Hosseini", publishedYear: 2003, copies: 5 },
  { title: "Crime and Punishment", author: "Fyodor Dostoevsky", publishedYear: 1866, copies: 4 },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await Book.deleteMany({}); // Clear existing books
    console.log("Existing books cleared");

    await Book.insertMany(sampleBooks);
    console.log("Sample books inserted");

    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding books:", err);
  }
}

seed();
