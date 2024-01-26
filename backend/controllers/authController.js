const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// get logged in details
const getLogin = async (req, res) => {
  // res.send("get Logged in user");
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      msg: "Server Error",
    });
  }
};

// log in account
const authLogin = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({ result: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "User not exists.",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        msg: "Invalid password",
      });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role, // Include the user's role in the payload
      },
    };

    jwt.sign(
      payload,
      process.env.JWTSECRET,
      {
        expiresIn: 3600000,
      },
      (err, token) => {
        if (err) throw err;
        return res.json({
          token,
        });
      }
    );
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};

module.exports = {
  getLogin,
  authLogin,
};
