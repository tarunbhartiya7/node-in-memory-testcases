let products = [];
let nextId = 1;

// Define the Product Interface
class Product {
  constructor(title, description, price) {
    this.id = nextId++;
    this.title = title;
    this.description = description;
    this.price = price;
  }
}

// CRUD Operations
const createProduct = (title, description, price) => {
  const product = new Product(title, description, price);
  products.push(product);
  return product;
};

const getAllProducts = () => products;

const getProductById = (id) => products.find((p) => p.id === id);

const updateProduct = (id, title, description, price) => {
  const product = products.find((p) => p.id === id);
  if (product) {
    product.title = title;
    product.description = description;
    product.price = price;
    return product;
  }
  return null;
};

const deleteProduct = (id) => {
  const index = products.findIndex((p) => p.id === id);
  if (index !== -1) {
    return products.splice(index, 1)[0];
  }
  return null;
};

// Create Sample Products
const createSampleProducts = () => {
  const sampleData = [
    {
      title: "Product 1",
      description: "Description of Product 1",
      price: 10.99,
    },
    {
      title: "Product 2",
      description: "Description of Product 2",
      price: 22.49,
    },
    {
      title: "Product 3",
      description: "Description of Product 3",
      price: 7.99,
    },
    {
      title: "Product 4",
      description: "Description of Product 4",
      price: 12.99,
    },
    {
      title: "Product 5",
      description: "Description of Product 5",
      price: 45.0,
    },
    {
      title: "Product 6",
      description: "Description of Product 6",
      price: 30.5,
    },
    {
      title: "Product 7",
      description: "Description of Product 7",
      price: 25.75,
    },
    {
      title: "Product 8",
      description: "Description of Product 8",
      price: 50.0,
    },
    {
      title: "Product 9",
      description: "Description of Product 9",
      price: 9.99,
    },
    {
      title: "Product 10",
      description: "Description of Product 10",
      price: 15.99,
    },
  ];

  sampleData.forEach((item) => {
    createProduct(item.title, item.description, item.price);
  });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createSampleProducts,
  products,
  nextId,
};
