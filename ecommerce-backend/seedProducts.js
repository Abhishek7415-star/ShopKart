
require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
  {
    name: "Samsung Galaxy S24",
    description: "Samsung smartphone with premium display",
    price: 64999,
    category: "mobile",
    brand: "Samsung",
    stock: 15,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500"
  },
  {
    name: "Wireless Headphones",
    description: "Wireless headphones with rich sound",
    price: 2499,
    category: "electronics",
    brand: "Boat",
    stock: 20,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
  },
  {
    name: "Running Shoes",
    description: "Comfortable shoes for daily running",
    price: 3499,
    category: "shoes",
    brand: "Nike",
    stock: 12,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
  },
  {
    name: "Classic T-Shirt",
    description: "Casual cotton t-shirt for everyday wear",
    price: 799,
    category: "fashion",
    brand: "Puma",
    stock: 30,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
  },
  {
    name: "Laptop",
    description: "Laptop for study, office and development",
    price: 55999,
    category: "electronics",
    brand: "HP",
    stock: 8,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500"
  },
  {
    name: "Smart Watch",
    description: "Smart watch with fitness tracking",
    price: 3999,
    category: "electronics",
    brand: "Noise",
    stock: 18,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
  },
  {
    name: "Travel Backpack",
    description: "Spacious backpack for college and travel",
    price: 1499,
    category: "fashion",
    brand: "Skybags",
    stock: 20,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable speaker for music and entertainment",
    price: 1999,
    category: "electronics",
    brand: "JBL",
    stock: 14,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500"
  },
  {
    name: "Men's Casual Shirt",
    description: "Stylish casual shirt for daily wear",
    price: 1299,
    category: "fashion",
    brand: "Roadster",
    stock: 25,
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500"
  },
  {
    name: "White Sneakers",
    description: "Minimal white sneakers for everyday outfits",
    price: 2799,
    category: "shoes",
    brand: "Adidas",
    stock: 16,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"
  },
  {
    name: "Wireless Mouse",
    description: "Wireless mouse for work and gaming",
    price: 899,
    category: "electronics",
    brand: "Logitech",
    stock: 22,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500"
  },
  {
    name: "Sunglasses",
    description: "Modern sunglasses for outdoor use",
    price: 999,
    category: "fashion",
    brand: "Fastrack",
    stock: 19,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
  },
  {
    name: "Gaming Headset",
    description: "Over-ear headset for gaming and calls",
    price: 2999,
    category: "electronics",
    brand: "Redgear",
    stock: 10,
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=500"
  },
  {
    name: "Denim Jeans",
    description: "Classic blue denim jeans",
    price: 1799,
    category: "fashion",
    brand: "Levis",
    stock: 24,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500"
  },
  {
    name: "Sports Shoes",
    description: "Lightweight sports shoes for daily workouts",
    price: 2299,
    category: "shoes",
    brand: "Reebok",
    stock: 13,
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500"
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    const result = await Product.insertMany(products);

    console.log(`${result.length} products added successfully!`);
  } catch (error) {
    console.error("Error adding products:", error.message);
  } finally {
    await mongoose.disconnect();
  }
};

seedProducts();