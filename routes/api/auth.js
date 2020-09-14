const express = require("express");
const router = express.Router();
//To use the express Router
const auth = require("../../middleware/auth");
//Custom middleware
const User = require("../../models/User");

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

module.exports = router;
