const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Middleware
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

// ================= PUBLIC ROUTES =================

// Get All Products
router.get("/", getProducts);

// Get Single Product
router.get("/:id", getProductById);

// ================= ADMIN ROUTES =================

// Add Product (Image Upload)
router.post(
  "/",
  protect,
  admin,
  upload.single("image"),
  addProduct
);

// Update Product
router.put(
  "/:id",
  protect,
  admin,
  upload.single("image"),
  updateProduct
);

// Delete Product
router.delete(
  "/:id",
  protect,
  admin,
  deleteProduct
);

module.exports = router;