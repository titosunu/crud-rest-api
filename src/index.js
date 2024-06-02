const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Hello World");
});

app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.send(products);
});

app.post("/products", async (req, res) => {
  const newProduct = req.body;
  const product = await prisma.product.create({
    data: {
      name: newProduct.name,
      price: newProduct.price,
      description: newProduct.description,
      image: newProduct.image,
    },
  });
  res.status(201).send({
    data: product,
    message: "create product success",
  });
});

app.delete("/products/:id", async (req, res) => {
  const id = req.params.id;
  await prisma.product.delete({
    where: {
      id: id,
    },
  });
  res.send("product deleted");
});

app.put("/products/:id", async (req, res) => {
  const id = req.params.id;
  const dataProduct = req.body;
  if (
    !(
      dataProduct.name &&
      dataProduct.price &&
      dataProduct.description &&
      dataProduct.image
    )
  ) {
    return res.status(400).send("some fields are missing");
  }
  const product = await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      name: dataProduct.name,
      price: dataProduct.price,
      description: dataProduct.description,
      image: dataProduct.image,
    },
  });
  res.send({
    data: product,
    message: "edit data success",
  });
});

app.patch("/products/:id", async (req, res) => {
  const id = req.params.id;
  const dataProduct = req.body;
  const product = await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      name: dataProduct.name,
      price: dataProduct.price,
      description: dataProduct.description,
      image: dataProduct.image,
    },
  });
  res.send({
    data: product,
    message: "edit data success",
  });
});

app.listen(PORT, () => {
  console.log("express API running in PORT: " + PORT);
});
