const mongoose = require("mongoose");

mongoose.model("Book",{
    title: {
        type: String,
        require: true
    },
    author:{
        type: String,
        require: true
    },
    numberPages: {
        type: Number,
        require: false
    },
    publisher: {
        type: String,
        require: false

    }

});
const Book = mongoose.model("Book")
module.exports=Book