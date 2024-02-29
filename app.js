const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blogList");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

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
app.use(middleware.tokenExtractor);
app.use("/api/blogs", blogRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use(middleware.errorHandler);

module.exports = app;
