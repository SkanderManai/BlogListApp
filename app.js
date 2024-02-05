const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blogList");
const logger = require("./utils/logger");

mongoose
  .connect(config.mongoUrl)
  .then(() => {
    logger.info("Connected to database");
  })
  .catch((error) => {
    logger.error(error);
  });

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogRouter);

module.exports = app;
