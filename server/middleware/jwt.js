const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
  const accessToken = sign(
    { name: user.name, id: user.id },
    "mayanthabuddhika",
    { expiresIn: "2h"}
  );
  return accessToken;
};

const validateToken = (req, res, next) => {
  const authHeader = req.headers["x-access-token"];
  console.log("Auth-Header from client side: ",authHeader);

  const token = authHeader.split(" ")[1];
  console.log("Token from client side: ",token);
  
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = verify(token, "mayanthabuddhika");
    req.user = decoded;
    next()
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
 
};


module.exports = { createTokens, validateToken };