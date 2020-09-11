const express = require("express");
const router = express.Router();
//To use the express Router

//@route    GET api/posts
//@desc     Test route
//@access   Public
//public don't need a token by creating an auth middleware
router.get("/", (req, res) => res.send("Posts route"));

module.exports = router;
