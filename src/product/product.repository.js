// to communication with db
const prisma = require("../db");

const findProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
};

const findProductsById = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  return product;
};

const findProductsByName = async (name) => {
  const product = await prisma.product.findFirst({
    where: {
      name,
    },
  });
  return product;
};

const insertProduct = async (newProduct) => {
  const product = await prisma.product.create({
    data: {
      name: newProduct.name,
      price: newProduct.price,
      description: newProduct.description,
      image: newProduct.image,
    },
  });
  return product;
};

const deleteProduct = async (id) => {
  await prisma.product.delete({
    where: {
      id,
    },
  });
};

const editProduct = async (id, dataProduct) => {
  const product = await prisma.product.update({
    where: {
      id,
    },
    data: {
      name: dataProduct.name,
      price: dataProduct.price,
      description: dataProduct.description,
      image: dataProduct.image,
    },
  });
  return product;
};

module.exports = {
  findProducts,
  findProductsById,
  insertProduct,
  deleteProduct,
  findProductsByName,
  editProduct,
};
