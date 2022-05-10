const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = async(req, res, next) => {
  const token = await req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(400).json({ status: true, msg: "Invalid token" });
  }

  try {
    const decode = await jwt.verify(token, process.env.SECRET);
    req.user = decode;
    next();
  } catch (err) {
    res.status(500).json({ status: false, msg: err });
  }
};
module.exports = verifyToken;
