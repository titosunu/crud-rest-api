const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

const productController = require("./product/product.controller");
app.use("/products", productController);

app.listen(PORT, () => {
  console.log("express API running in PORT: " + PORT);
});
