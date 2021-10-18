const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://db/books",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Database is connected");
  }
);
