const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("x-authorization-token");
    if (!authHeader) {
      return res.json({ err: "Token not found" });
    }
    const token = authHeader.split(" ")[1];
    if (!token || token === "" || token === null) {
      req.user = undefined;
      next();
      //return res.status(401).json({ message: "You need to be logged in" });
    }
    const decode = await jwt.verify(token, process.env.SECRETE_KEY);
    if (decode) {
      req.user = decode.id;
      console.log(req.user);
    }
    next();
  } catch (err) {
    req.user = undefined;
    next();
  }
};

module.exports = authMiddleware;
