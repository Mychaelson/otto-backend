const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const app = express();

dotenv.config();

const PORT = process.env.PORT || 2000;

app.use(cors());
app.use(express.json());

app.use("/", (req, res) => {
  res.send("<h1>OTTO BACKEND DEVELOPER TEST</h1>");
});

app.listen(PORT, () => {
  console.log("Listening in port", PORT);
});
