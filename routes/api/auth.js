const express = require("express");
const router = express.Router();
//To use the express Router
const auth = require("../../middleware/auth");
//Custom middleware
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const dbconfig = require("../../config/dbconfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//@route    GET api/auth
//@desc     Test route
//@access   Public
router.get("/", auth, async (req, res) => {
  //Send back the user data
  try {
    const user = await User.findById(req.user.id).select("-password");
    //Getting the user with its id, passed to the req in the middleware
    //With .select the data can be removed
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
//Wherever the Auth is needed, it just need to be put inside the router

//@route    POST api/auth
//@desc     Authenticate user & get token
//@access   Public

//Almost the same as when user is created
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      //Getting the user with the email and password
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      //bcrypt.compare() receiving the password passed and the password from the user found, returns boolean

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      //For security reasons it's better to have the same exact response for each case

      //Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        dbconfig.jwtSecret,
        {
          expiresIn: 360000,
        },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
