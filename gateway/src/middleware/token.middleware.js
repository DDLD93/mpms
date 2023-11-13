const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config").app;

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.replace("Bearer ", "") || req.body.token || req.query.token;
  
    if (!token) {
      return res.status(403).json({ ok: false, message: "No token found" });
    }
  
    try {
      const decoded = jwt.verify(token, jwtSecret);
      if (!decoded) {
        return res.status(401).json({ ok: false, message: "Invalid token" });
      }
  
      // req.user = decoded;
  
      next();
    } catch (error) {
      // Handle invalid tokens
      return res.status(401).json({ ok: false, message: "Invalid token" });
    }
  };
  
  module.exports = verifyToken;