const z = require("zod");
const { mode } = require("../config");

const globalErrorHandler = (err, req, res, next) => {
  const isDevelopment = mode === "development";
  let statusCode = err.statusCode || err.status || 500;
  let message = err.message || "Internal server error";
  let errors = [];

  if (err instanceof z.ZodError) {
    statusCode = 400;
    message = "Validation error";
    errors = err.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));
  } else if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation error";
    errors = Object.values(err.errors || {}).map((error) => ({
      path: error.path,
      message: error.message,
    }));
  } else if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid data format";
    errors = [{ path: err.path, message: "Invalid ID format" }];
  } else if (err.code === 11000 || err.code === 11001) {
    statusCode = 409;
    message = "Duplicate field value";
    errors = [
      { path: "database", message: "A record with this value already exists" },
    ];
  }

  const response = {
    success: false,
    message,
    ...(errors.length > 0 && { errors }),
  };

  if (isDevelopment) {
    response.error = err.name || "Error";
    response.stack = err.stack;
  }

  console.error(`[${req.method}] ${req.originalUrl} -> ${statusCode}`, err);

  return res.status(statusCode).json(response);
};

module.exports = { globalErrorHandler };
