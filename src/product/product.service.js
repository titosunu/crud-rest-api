// Service layer for handle business logic

const {
  findProducts,
  findProductsById,
  insertProduct,
  deleteProduct,
  findProductsByName,
  editProduct,
} = require("./product.repository");

const getAllProducts = async () => {
  const products = await findProducts();
  return products;
};

const getProductById = async (id) => {
  const product = await findProductsById(id);
  if (!product) {
    throw Error("product not found");
  }
  return product;
};

const createProduct = async (newProduct) => {
  const findProduct = await findProductsByName(newProduct.name);
  if (findProduct) {
    throw Error("name has to be unique");
  }
  const product = await insertProduct(newProduct);
  return product;
};

const deleteProductById = async (id) => {
  await getProductById(id);
  await deleteProduct(id);
};

const editProductById = async (id, dataProduct) => {
  await getProductById(id);
  const product = await editProduct(id, dataProduct);
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  editProductById,
};
