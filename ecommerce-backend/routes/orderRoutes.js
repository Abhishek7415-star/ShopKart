
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const Order = require("../models/Order");
const Product = require("../models/Product");

const router = express.Router();

// POST /api/orders - Place a new order
router.post("/", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Please login before placing an order",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id || decoded._id || decoded.userId;

    if (!userId || !mongoose.isValidObjectId(userId)) {
      return res.status(401).json({
        success: false,
        message: "Invalid login token. Please login again.",
      });
    }

    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty",
      });
    }

    const requiredAddressFields = [
      "address",
      "city",
      "state",
      "postalCode",
      "country",
    ];

    const missingAddress = requiredAddressFields.some(
      (field) => !shippingAddress?.[field]?.toString().trim()
    );

    if (missingAddress) {
      return res.status(400).json({
        success: false,
        message: "Please provide a complete shipping address",
      });
    }

    if (
      paymentMethod &&
      paymentMethod !== "Cash on Delivery"
    ) {
      return res.status(400).json({
        success: false,
        message: "Only Cash on Delivery is currently supported",
      });
    }

    let totalPrice = 0;
    const validatedItems = [];

    for (const item of orderItems) {
      const productId = item.product || item._id;
      const quantity = Number(item.quantity);

      if (
        !mongoose.isValidObjectId(productId) ||
        !Number.isInteger(quantity) ||
        quantity < 1
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid product or quantity",
        });
      }

      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "A product in your cart was not found",
        });
      }

      if (quantity > product.stock) {
        return res.status(400).json({
          success: false,
          message: `${product.name} has only ${product.stock} item(s) in stock`,
        });
      }

      totalPrice += product.price * quantity;

      validatedItems.push({
        product: product._id,
        quantity,
      });
    }

    const order = await Order.create({
      user: userId,
      orderItems: validatedItems,
      shippingAddress: {
        address: shippingAddress.address.trim(),
        city: shippingAddress.city.trim(),
        state: shippingAddress.state.trim(),
        postalCode: shippingAddress.postalCode.trim(),
        country: shippingAddress.country.trim(),
      },
      paymentMethod: "Cash on Delivery",
      totalPrice,
    });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order,
    });
  } catch (error) {
    console.error("Place order error:", error.message);

    if (error.name === "JsonWebTokenError" ||
        error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Login session expired. Please login again.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to place order",
    });
  }
});

// GET /api/orders/myorders - Get logged-in user's orders
router.get("/myorders", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id || decoded._id || decoded.userId;

    if (!userId || !mongoose.isValidObjectId(userId)) {
      return res.status(401).json({
        success: false,
        message: "Invalid login token",
      });
    }

    const orders = await Order.find({ user: userId })
      .populate("orderItems.product", "name price image")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Fetch orders error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch orders",
    });
  }
});

module.exports = router;