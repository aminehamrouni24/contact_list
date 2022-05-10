const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register
router.post("/register", async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: true, msg: "User exists, Please Login !!!" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });
    return res
      .status(200)
      .json({ status: true, msg: "Created successfully", data: user });
  } catch (err) {
    return res.status(500).json({ status: false, msg: err });
  }
});

// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    //    checking if the user exists
    const user = await User.findOne({ email });
    // if the user exists
    if (user) {
      // comparing the passwords
      const comparedPassword = await bcrypt.compare(password, user.password);
      if (comparedPassword) {
        const token = await jwt.sign(
          { id: user._id, email: user.email },
          process.env.SECRET
        );
        return res
          .status(200)
          .json({ status: true, msg: "Logged in successfully", token: token });
      } else {
        return res.status(400).json({ status: true, msg: "Wrong Passwords" });
      }
    } else {
      return res
        .status(400)
        .json({ status: true, msg: "User not found.. Please register" });
    }
  } catch (err) {
    return res.status(500).json({ status: false, msg: err });
  }
});

module.exports = router;
