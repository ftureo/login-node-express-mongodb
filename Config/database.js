const mongoose = require("mongoose");

require("dotenv").config();
console.log("MongoURI in DB", process.env.MONGODB_URI);
//Configuration default for connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => console.log("Database Connected"))
  .catch((error) => console.log(error));
