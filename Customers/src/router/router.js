const { default: Axios } = require("axios");
const express = require("express");
const app = express.Router();
const Customer = require("../model/Customer");

app.get("/", (req, res) => {
  res.send("this is our main end point");
});

//create a customer
app.post("/customer", (req, res, next) => {
  var newCustomer = {
    name: req.body.name,
    age: req.body.age,
    address: req.body.address,
  };

  var customer = new Customer(newCustomer);

  customer
    .save()
    .then(() => res.send(customer))
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.get("/customers", (req, res) => {
  Customer.find()
    .then((customers) => {
      res.json(customers);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

//get les ordres taa3 customer mo3ayen
app.get("/customerOrders/:id", (req, res) => {
  Customer.findById(req.params.id)
    .then((customer) => {
      if (customer) {
        Axios.get("http://orders:7777/orders/" + customer._id).then(
          (orders) => {
            res.send({ customer, orders: orders.data });
          }
        );
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

app.get("/customer/:id", (req, res) => {
  Customer.findById(req.params.id)
    .then((customer) => {
      if (customer) {
        res.json(customer);
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

app.delete("/customer/:id", (req, res) => {
  Customer.findOneAndRemove(req.params.id)
    .then(() => {
      res.send("Customer removed with success!");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});
module.exports = app;
