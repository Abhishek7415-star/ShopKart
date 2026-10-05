const Cart = require("../models/Cart");

const addToCart = async (req, res) => {
  try {
    const { user, product, quantity } = req.body;

    // Check if product already exists in cart
    let cartItem = await Cart.findOne({ user, product });

    if (cartItem) {
      cartItem.quantity += quantity || 1;
      await cartItem.save();

      return res.status(200).json({
        success: true,
        message: "Cart Updated",
        cartItem,
      });
    }

    cartItem = await Cart.create({
      user,
      product,
      quantity: quantity || 1,
    });

    res.status(201).json({
      success: true,
      message: "Product Added To Cart",
      cartItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({ user: req.params.userId })
      .populate("product")
      .populate("user", "name email");

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
};