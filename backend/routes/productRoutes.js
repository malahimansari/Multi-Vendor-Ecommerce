const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/authMiddleware");
const vendor = require("../middleware/vendorMiddleware");
const productController = require("../controllers/productController");

router.use(auth);

/**
 * @route   POST /api/v1/products
 * @desc    Create a new product
 * @access  private (for vendors)
 */

router.post("/",
[
  vendor,
  [
    check("name", "Please enter the product name.").notEmpty(),
    check("description", "Please enter the product description.").notEmpty(),
    check("price", "Please enter a valid product price.").isNumeric(),
    check("category", "Please enter the product category.").notEmpty(),
    check("stock", "Please enter the product stock.").isNumeric(),
    check("image", "Please select the product image.").notEmpty(),
  ],
],
  productController.createProduct
);


/**
 * @route   GET /api/v1/products
 * @desc    Get all products
 * @access  public
 */

router.get('/', productController.getProducts);


/**
 * @route   PUT /api/v1/products
 * @desc    update product by id
 * @access  private
 */

router.put("/:id",
[
  vendor,
  [
    check("name", "Please enter the product name.").notEmpty(),
    check("description", "Please enter the product description.").notEmpty(),
    check("price", "Please enter a valid product price.").isNumeric(),
    check("category", "Please enter the product category.").notEmpty(),
    check("stock", "Please enter the product stock.").isNumeric(),
    check("image", "Please select the product image.").notEmpty(),
  ],
],
  productController.updateProduct
);


/**
 * @route   DELETE /api/v1/products
 * @desc    delete product by id
 * @access  private
 */

router.delete("/:id",vendor,productController.deleteProduct);


module.exports = router;