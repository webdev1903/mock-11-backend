const express = require("express");
const connect = require("./configs/db");
const cors = require("cors");
const app = express();
const path = require("path");
const userController = require("./controllers/user.controller");
app.use(express.json());
app.use(cors());

app.use("", userController);

app.listen(3000, async () => {
  try {
    await connect();
    console.log("listening on port 3000");
  } catch (error) {
    console.log(error);
  }
});
