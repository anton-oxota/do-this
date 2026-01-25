const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/database");

const app = express();
const port = 3000;

const routes = require("./routes/index");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use(routes);

connectDB();

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
