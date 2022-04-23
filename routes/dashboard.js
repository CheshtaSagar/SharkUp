const express = require("express");
const router = express.Router();
var auth = require('../config/auth');
const upload = require("../config/multer");
const cloudinary = require("../config/cloudinary");
var isUser = auth.isUser;
const Investor = require("../models/Investor");
const Entrepreneur = require("../models/Entrepreneur");


router.get("/investorDashboard", function (req, res) {
    res.render("investorDashboard");
  });


 
router.get("/entrepreneurDashboard", function (req, res) {
    res.render("entreDash");
  });


module.exports = router;