require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { mainRouter } = require("./routes");
const { parsePaginationValues } = require("./middlewares/parsing");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "views")));

app.use("/api/v1", parsePaginationValues, mainRouter);

app.get(/^\/((?!\.).)*$/, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.use((err, _req, res) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
