const express = require("express");
const router = express.Router();
//To use the express Router
const { check, validationResult } = require("express-validator/check");
//Handle validation and responses if the data is not well passed

//@route    POST api/users
//@desc     Register user
//@access   Public
//public don't need a token by creating an auth middleware
router.post(
  "/",
  [
    //All the rules check are in express-validator documentation
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Object of data that will be sent to this route
    //Middleware for body parser has to be initialized, included with express
    res.send("User route");
  }
);

module.exports = router;
