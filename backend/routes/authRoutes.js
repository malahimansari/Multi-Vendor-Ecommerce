const express = require('express');
const { check } = require("express-validator");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

const auth_controller = require("../controllers/authController");


/**
 * @route GET /api/v1/auth
 * @desc Get logged in data
 * @access private
 */

router.get(
    "/",
    auth,
    auth_controller.getLogin
)


/**
 * @route POST /api/v1/auth/login
 * @desc log in user
 * @access public
 */

router.post(
    "/login",
    [
        check("email", "Please enter your valid email").isEmail(),
        check("password", "Please enter your valid password").exists(),
    ],
    auth_controller.authLogin
)


module.exports = router;