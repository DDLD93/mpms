const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config").app;

const tokenParser = (requiredUserTypes) => (req, res, next) => {
    // Extract the token from the Authorization header
    const token = req.headers["authorization"]?.replace("Bearer ", "");
  
    // Check if token is provided
    if (!token) {
      return res.status(403).json({ ok: false, message: "Bearer token not provided" });
    }
  
    try {
      // Verify the token and decode its payload
      const decoded = jwt.verify(token, jwtSecret);
  
      // Check if requiredUserTypes are provided and if the userType is authorized
      if (requiredUserTypes && !requiredUserTypes.includes(decoded.userType)) {
        return res.status(403).json({ ok: false, message: "Unauthorized user type" });
      }
  
      // Set the decoded user object on the request for further processing
      req.user = decoded;
  
      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      // Handle invalid tokens
      return res.status(401).json({ ok: false, message: "Invalid token" });
    }
  };
  
  module.exports = tokenParser;