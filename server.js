const express = require("express");
const cors = require("cors");
const router = require("./Routes");

require("dotenv").config();
require("./Config/database");

const PORT = 4000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.get("/", (req, res) => {
  res.json("Llegando");
});

app.listen(PORT, () => {
  console.log(`App running in port ${PORT}!`);
});
