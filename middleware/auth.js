const jwt = require("jsonwebtoken");
//const config = require("config");
const dbconfig = require("../config/dbconfig");

module.exports = function (req, res, next) {
  //Middleware function: has access to the request and response cycle
  //next is a callback that runs when done to move to the next piece of middleware

  //Get token from header
  const token = req.header("x-auth-token");
  //

  //Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  //

  //Verify token
  try {
    //Using JWT to decode the token
    //const decoded = jwt.verify(token,config.get('jwtSecret'));
    const decoded = jwt.verify(token, dbconfig.jwtSecret);
    req.user = decoded.user;
    //If the token is valid, the decoded user is assigned as the request value
    //It can be used in any of the protected routes: for example to get the user's profile
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
  //
};
