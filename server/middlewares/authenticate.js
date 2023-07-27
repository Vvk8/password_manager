const jwt = require('jsonwebtoken');
const User = require("../models/schema");
const { decrypt } = require("../models/EncDecManager");

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;

    // Check if the token exists
    if (!token) {
      throw new Error("Token not provided");
    }

    // Verify the token and get the decoded payload
    const verify = jwt.verify(token, process.env.SECRET_KEY);

    // Find the user based on the decoded payload
    const rootUser = await User.findOne({ _id: verify._id, "tokens.token": token });

    // Check if the user exists
    if (!rootUser) {
      throw new Error("User not found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;
    next();
  } catch (error) {
    // Handle token-related errors
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: "Invalid token" });
    } else if (error.name === "TokenExpiredError") {
      res.status(401).json({ error: "Token has expired" });
    } else {
      res.status(400).json({ error: "Unauthorised user" });
    }
    console.log(">>>>>>>>>>>>>>>>>>>", error);
  }
};

module.exports = authenticate;
