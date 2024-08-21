const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const product = require("../product");
const router = require("../app").router;

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use("/api", router);

beforeEach(() => {
  // Clear the product array and reinitialize sample products before each test
  product.products = [];
  product.nextId = 1;
  product.createSampleProducts();
});

describe("Product CRUD Operations", () => {
  // Test GET all products
  it("should get all products", async () => {
    const response = await request(app).get("/api/products");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(10);
  });

  // Test GET a single product
  it("should get a single product by ID", async () => {
    const products = await request(app).get("/api/products");
    const productId = products.body[0].id;
    const response = await request(app).get(`/api/products/${productId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", productId);
  });

  // Test POST (Create) a new product
  it("should create a new product", async () => {
    const newProduct = {
      title: "New Product",
      description: "Description of new product",
      price: 29.99,
    };
    const response = await request(app).post("/api/products").send(newProduct);
    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject(newProduct);
  });

  // Test PUT (Update) an existing product
  it("should update an existing product", async () => {
    const products = await request(app).get("/api/products");
    const productId = products.body[0].id;
    const updatedProduct = {
      title: "Updated Product",
      description: "Updated description",
      price: 39.99,
    };
    const response = await request(app)
      .put(`/api/products/${productId}`)
      .send(updatedProduct);
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(updatedProduct);
  });

  // Test DELETE (Remove) a product
  it("should delete a product", async () => {
    const products = await request(app).get("/api/products");
    const productId = products.body[0].id;
    const response = await request(app).delete(`/api/products/${productId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", productId);
    // Verify that the product is deleted
    const remainingProducts = await request(app).get("/api/products");
    expect(remainingProducts.body).not.toContainEqual(
      expect.objectContaining({ id: productId })
    );
  });
});
