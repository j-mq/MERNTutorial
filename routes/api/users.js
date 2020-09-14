const express = require("express");
const router = express.Router();
//To use the express Router
const { check, validationResult } = require("express-validator");
//Handle validation and responses if the data is not well passed
const User = require("../../models/User");
//Bring the user model
const gravatar = require("gravatar");
//For avatars
const bcrypt = require("bcryptjs");
//For encrypting password
const jwt = require("jsonwebtoken");
//Token for authentication
//const config = require("config");
//Not in use, instead using env variables
const dbconfig = require("../../config/dbconfig");

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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Object of data that will be sent to this route
    //Middleware for body parser has to be initialized, included with express

    const { name, email, password } = req.body;
    //Destructure the body

    try {
      //See if the user exists (the email is on use)
      let user = await User.findOne({ email });
      //searching user with findOne with the desired parameter
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
        //To get the same type of error
      }
      //
      //Get users gravatar
      const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
      //Creating User not saved yet
      user = new User({ name, email, avatar, password });
      //
      //Encrypt password
      const salt = await bcrypt.genSalt(10);
      //To do hashing, recommended is 10 in documentation
      user.password = await bcrypt.hash(password, salt);
      //
      //Saving the user (Anything that returns a promise goes with await)
      await user.save();
      //

      //Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
          //Even if in mongoose it's saved as _id, it doesn't need the "_" for calling
        },
      };
      //jwt.sign(payload, config.get("jwtSecret"));
      jwt.sign(
        payload,
        dbconfig.jwtSecret,
        {
          //expiresIn: 3600 => Change on deploy
          expiresIn: 360000,
        },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
          //Receiving the token
        }
      );
      //
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
