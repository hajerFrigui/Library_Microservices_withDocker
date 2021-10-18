const express = require("express");
const app = express.Router();
const Order = require("../model/Order");
const axios = require("axios");
const mongoose = require("mongoose");
const { response } = require("express");

app.get("/", (req, res) => {
  res.send("this is our main end point");
});

//create a order
app.post("/order", (req, res, next) => {
  const intial = new Date();
  const delivery = new Date(intial.getTime() + 7 * 24 * 60 * 60 * 1000);
  var newOrder = {
    CustomerID: mongoose.Types.ObjectId(req.body.CustomerID),
    BookID: mongoose.Types.ObjectId(req.body.BookID),
    initialDate: intial,
    deliveryDate: delivery,
  };

  var order = new Order(newOrder);

  order
    .save()
    .then(() => {
      res.send(order);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.get("/orders", (req, res) => {
  Order.find()
    .then((books) => {
      res.json(books);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

// fel orders ,selon id taa customer  ijibli info taa customer w info taa kol kteb 3addeh fi ordres
app.get("/orders/:CustomerID", async (req, res) => {
  const { CustomerID } = req.params;
  const orders = await Order.find({ CustomerID });
  var customerOrders = [];
  Promise.all(
    orders.map(async (order) => {
      const { data } = await axios.get(
        "http://books:4545/book/" + order.BookID
      );

      customerOrders.push({
        bookTitle: data.title,
        initial: order.initialDate,
        delivery: order.deliveryDate,
      });
    })
  ).then(() => res.json(customerOrders));
});

//selon id taa order ijibli nom taa client w les info taa book illi 5theh fel ordre heka
app.get("/order/:id", (req, res) => {
  Order.findById(req.params.id)
    .then((order) => {
      if (order) {
        axios
          .get("http://customers:4000/customer/" + order.CustomerID)
          .then((response) => {
            var orderObject = { customer: response.data.name };
            axios
              .get("http://books:4545/book/" + order.BookID)
              .then((response) => {
                orderObject.bookTitle = response.data.title;
                orderObject.intial = order.initialDate;
                orderObject.delivery = order.deliveryDate;
                res.json(orderObject);
              });
          });
      } else {
        res.send("invalid Order");
      }
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.delete("/order/:id", (req, res) => {
  Order.findOneAndRemove(req.params.id)
    .then(() => {
      res.send("Order removed with success!");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});
module.exports = app;
