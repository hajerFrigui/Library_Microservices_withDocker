const mongoose = require("mongoose");
mongoose.model("Order",{
    CustomerID: {
        type: mongoose.SchemaTypes.ObjectID,
        require: true
    },
    BookID:{
        type: mongoose.SchemaTypes.ObjectID,
        require: true
    },
    initialDate: {
        type: Date,
        require: true
    },
    deliveryDate: {
        type: Date,
        require: true
    }

});
const Order = mongoose.model("Order")
module.exports=Order