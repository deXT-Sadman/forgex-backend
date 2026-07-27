const app = require("./app");
const colors = require("colors");
const mongoose = require("mongoose");
const { port, mongodbUri, mode } = require("./config");

const isDevelopment = mode === "development";
let server;

// Connect to MongoDB
mongoose
  .connect(mongodbUri)
  .then(() => {
    console.log(colors.green("[MongoDB] Connected successfully"));
  })
  .catch((err) => {
    console.error(colors.red(`[MongoDB] Connection failed`));

    if (isDevelopment) {
      console.error(colors.gray(err.message));
    }

    // Safe exit on database connection failure
    // Close the server and exit the process with a non-zero status code
    if (server) {
      server.close(() => {
        console.error(
          colors.red(
            "[Server] Shutting down due to database connection failure",
          ),
        );
        process.exit(1);
      });
    } else {
      console.error(colors.red("[Server] Server not started, exiting process"));
      process.exit(1);
    }
  });

// Start the server
server = app.listen(port, () => {
  console.log(colors.cyan(`[Server] Running on http://localhost:${port}`));

  if (isDevelopment) {
    console.log(colors.gray("[Server] Environment: development"));
  }
});
