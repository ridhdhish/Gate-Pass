const jwt = require("jsonwebtoken");

module.exports.getToken = (req) => {
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRETE_KEY);

  return decodedToken;
};
