const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");
const paymentController = require('./paymentController');

const generateOrderId = () => {
  return uuidv4();
};

// create a new order
const createOrder = async (req, res) => {
  try {
    const { products, paymentMethod } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ msg: "Invalid products array" });
    }

    // Calculate total amount
    const totalAmount = await calculateTotalAmount(products);

    const newOrder = new Order({
      user: req.user.id, // Use the user ID from the authenticated user
      products,
      totalAmount,
      orderId: generateOrderId(),
    });

    await newOrder.save();

    if (paymentMethod) {
      // Retrieve the user from the database
      const user = await User.findById(req.user.id);

      // Charge the user using the provided payment method
      await paymentController.createPaymentIntent(user, totalAmount, newOrder._id);
    }


    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error.message);
    if (error.message.includes('Product with ID')) {
      return res.status(404).json({ msg: error.message });
    }
    res.status(500).json({ msg: "Server Error" });
  }
};

const calculateTotalAmount = async (products) => {
  let totalAmount = 0;

  for (const product of products) {
    const { productId, quantity } = product;

    try {
      // Find the product by ID
      const productDetails = await Product.findById(productId);

      if (!productDetails) {
        throw new Error(`Product with ID ${productId} not found`);
      }

      // Calculate total amount for each product
      totalAmount += productDetails.price * quantity;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }
 
  return totalAmount;
};

module.exports = {
  createOrder,
};
