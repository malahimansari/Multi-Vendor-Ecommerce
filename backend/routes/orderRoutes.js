const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');

// Apply authentication middleware to all order routes
router.use(auth);

// Create a new order
router.post('/', orderController.createOrder);

module.exports = router;