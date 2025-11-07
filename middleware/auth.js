const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Verify JWT from Authorization header (Bearer <token>) or httpOnly cookie `token`
const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach minimal user info
    const user = await User.findById(decoded.id).select("email role");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = { id: decoded.id, email: user.email, role: user.role };
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};

module.exports = { protect };
