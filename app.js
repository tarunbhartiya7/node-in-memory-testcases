const express = require("express");
const bodyParser = require("body-parser");
const product = require("./product");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
const router = express.Router();

router.post("/products", (req, res) => {
  const { title, description, price } = req.body;
  if (!title || !description || !price) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const newProduct = product.createProduct(title, description, price);
  res.status(201).json(newProduct);
});

router.get("/products", (req, res) => {
  const products = product.getAllProducts();
  res.json(products);
});

router.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const productById = product.getProductById(id);
  if (productById) {
    res.json(productById);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

router.put("/products/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, description, price } = req.body;
  if (!title || !description || !price) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const updatedProduct = product.updateProduct(id, title, description, price);
  if (updatedProduct) {
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

router.delete("/products/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const deletedProduct = product.deleteProduct(id);
  if (deletedProduct) {
    res.json(deletedProduct);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.use("/api", router);

// Start the server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = {
  app,
  router,
};
