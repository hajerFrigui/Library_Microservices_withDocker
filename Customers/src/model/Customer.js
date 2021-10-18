const mongoose = require("mongoose");

mongoose.model("Customer",{
    name: {
        type: String,
        require: true
    },
    age:{
        type: Number,
        require: true
    },
    address: {
        type: String,
        require: false
    }

});
const Customer = mongoose.model("Customer")
module.exports = Customer