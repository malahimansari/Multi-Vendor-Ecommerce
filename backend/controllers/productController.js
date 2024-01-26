const { validationResult } = require("express-validator");
const Product = require("../models/Product");

// Create a new product

const createProduct = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result });
  }

  const { name, description, price, category, stock, image } = req.body;

  try {
    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      image,
      vendor: req.user.id,
    });

    await product.save();

    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

// get products

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ product: req.user.vendor });
    if (!products) {
      return res.status(400).json({msg: "product not found"});
    }
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({"msg": "Server Error"});
  }
};

// update product by id 

const updateProduct = async (req, res) => {
  const id = req.params.id;

  const { name, description, price, category, stock, image } = req.body;

  try {
    let productFields = {};

    if(name) productFields.name = name;
    if(description) productFields.description = description;
    if(price) productFields.price = price;
    if(category) productFields.category = category;
    if(stock) productFields.stock = stock;
    if(image) productFields.image = image;

    let product = await Product.findById(id);

    if(!product){
      return res.status(404).json({ msg: "Product not found"});
    }

    if(req.user.id.toString() != product.vendor.toString()){
      return res.status(401).json({ msg: "Not authorized"});
    }

    product = await Product.findByIdAndUpdate(
      id,
      {$set : productFields},
      {new: true}
    );

    return res.json(product);

  }
  catch(error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

// delete product by id

const deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id);

    if(!product){
      return res.status(404).json({ msg: "Product not found"});
    }

    if(req.user.id.toString() != product.vendor.toString()){
      return res.status(401).json({ msg: "Not authorized"});
    }

    await Product.findByIdAndDelete(id);

    return res.json({ msg: "Product deleted"});

  }
  catch(error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
}

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
};
