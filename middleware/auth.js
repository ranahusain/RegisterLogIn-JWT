const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  //grab token from coookie
  console.log(req.cookies);
  const token = req.cookies.token;

  //if no token,stop there
  if (!token) {
    res.status(403).send("please login first");
  }

  //if token present, decode the token,get id
  try {
    const decode = jwt.verify(token, "shhhh");
    console.log(decode);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send("invalid token");
  }

  //query to DB for that user id

  next();
};

module.exports = auth;
