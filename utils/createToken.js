const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRETE_KEY);
};

module.exports = { generateToken };
