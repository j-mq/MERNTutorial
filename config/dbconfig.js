const dotenv = require("dotenv");
dotenv.config();
//Gets the secret things from dotenv => define them locally
module.exports = {
  mongoURI: process.env.URI_ADDRESS,
  jwtSecret: process.env.JWT_SECRET,
};
