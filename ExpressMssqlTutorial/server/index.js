const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const { connect } = require("./db");

const app = express();
const port = 3333;

app.use(bodyParser.json());

connect()
  .then(() => console.log("Connected to the database."))
  .catch((error) => {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  });

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
