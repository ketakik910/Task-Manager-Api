const jwt = require("jsonwebtoken");

// Token generation and verification functions
function generateToken(user) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  const payload = {
    id: user._id,
    role: user.role,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
}

// Token verification function
function verifyToken(token) {
    const secret = process.env.JWT_SECRET || "defaultsecret";
    return jwt.verify(token, secret);
}

module.exports = {
    generateToken,
    verifyToken
};