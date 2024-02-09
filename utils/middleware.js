const logger = require("./logger");

const errorHandler = (error, requuest, response, next) => {
  logger.error(error.message);

  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "CastError") {
    return response.status(400).json({ error: "malformatted id" });
  }

  next(error);
};

module.exports = errorHandler;
