const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect(config.mongoUrl);

app.use(cors());
app.use(express.json());

module.exports = app;