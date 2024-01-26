const express = require('express');
const { check } = require("express-validator");

const router = express.Router();

//controller
const user_controller = require("../controllers/userController");

/**
 * @route POST /api/v1/users/register_user
 * @desc Create a new user
 * @access public
 */

router.post(
    "/register_user",
    [
      check("name", "Please enter your full name.").not().isEmpty(),
      check("email", "Please enter a valid email address.").isEmail(),
      check("password", "Please insert at least 6 characters.").isLength({
        min: 6,
      }),
    ],
    user_controller.registerUser
  );



/**
 * @route POST /api/v1/users/register_vendor
 * @desc Create a new vendor
 * @access public
 */

  router.post(
    "/register_vendor",
    [
      check("name", "Please enter your full name.").not().isEmpty(),
      check("email", "Please enter a valid email address.").isEmail(),
      check("password", "Please insert at least 6 characters.").isLength({
        min: 6,
      }),
      check("ph_num", "Enter a Valid Phone Number").isLength({
        min: 10,
        max: 15,
      })
    ],
    user_controller.registerVendor
  );


  module.exports = router;
