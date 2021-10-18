const express = require("express");
const app = express.Router();
const Book = require("../model/Book");

app.get("/", (req, res) => {
  res.send("this is our main end point");
});

//create a book
app.post("/book", (req, res, next) => {
  var newBook = {
    title: req.body.title,
    author: req.body.author,
    numberPages: req.body.numberPages,
    publisher: req.body.publisher,
  };

  var book = new Book(newBook);

  book
    .save()
    .then(() => res.send(book))
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.get("/books", (req, res) => {
  Book.find()
    .then((books) => {
      res.json(books);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.get("/book/:id", (req, res) => {
  Book.findById(req.params.id)
    .then((book) => {
      if (book) {
        res.json(book);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.delete("/book/:id", (req, res) => {
  Book.findOneAndRemove(req.params.id)
    .then(() => {
      res.send("Book removed with success!");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});
module.exports = app;
