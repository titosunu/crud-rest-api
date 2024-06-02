// Layer for handle req & res

const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  editProductById,
} = require("./product.service");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await getAllProducts();
  res.send(products);
});

router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await getProductById(productId);
    res.send(product);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const newProduct = req.body;
    const product = await createProduct(newProduct);
    res.status(201).send({
      data: product,
      message: "create product success",
    });
  } catch (error) {
    res.send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteProductById(id);
    res.send("product deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
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
  const product = await editProductById(id, dataProduct);
  res.send({
    data: product,
    message: "edit data success",
  });
});

router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const dataProduct = req.body;
    const product = await editProductById(id, dataProduct);
    res.send({
      data: product,
      message: "edit data success",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
