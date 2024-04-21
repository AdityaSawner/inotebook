const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "longman";

// this is to create user /api/auth/createuser
router.post(
  "/createUser",
  [
    body("name", "enter valid name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success=false;
    //if there are error it will return it as bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    //check whether user exist or not(email only)
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success,error: "user already exist" });
      }

      const salt = await bcrypt.genSalt(10);

      secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true
      res.json({ success,authtoken });
      // res.json(user);
    } catch (error) {
      console.error(error.message);
      res.json(500).send("internal server error");
    }
  }
);

// this is to authenticate user /api/auth/login

router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password", "Password cant be empty").exists(),
  ],
  async (req, res) => {
    let success=false;
    //if there are error it will return it as bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({success, error: "login with correct credential" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({success, error: "login with correct credential" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);

      success=true;

      res.json({success,authtoken: authtoken});

    } catch (error) {
      console.error(error.message);
      res.json(500).send("internal server error");
    }
  }
);

//Route3: for sendinguser detail /api/auth/getuser
router.post("/getuser",fetchuser,async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
);

module.exports = router;
