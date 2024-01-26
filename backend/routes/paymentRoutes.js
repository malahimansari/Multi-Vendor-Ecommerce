const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const stripe = require("stripe")(process.env.STRIPE);

router.post("/", auth, async (req, res) => {
  try {
    const { orderId, totalAmount} = req.body;

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100, // Stripe uses amounts in cents
      currency: "usd", // Change based on your currency
      description: `Order #${orderId} payment`,
      payment_method: "pm_card_visa", // Replace with actual payment method
    });

    // Send the client secret to confirm the payment on the client side
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Error initiating payment" });
  }
});

module.exports = router;
