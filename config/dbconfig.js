const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  mongoURI: process.env.URI_ADDRESS,
  jwtSecret: process.env.JWT_SECRET,
};
