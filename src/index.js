const app = require("./app");
const mongoose = require("mongoose");
const { port, mongodbUri } = require("./config");

// Connect to MongoDB
mongoose
  .connect(mongodbUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
