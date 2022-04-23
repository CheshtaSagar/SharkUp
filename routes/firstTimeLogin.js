// 
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
// const { check, validationResult } = require('express-validator');
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); //for storing encrypted password
const passport = require("passport");
const async = require('async');
const User = require("../models/User");
const crypto = require("crypto"); //to generate file names
// const multer = require("multer");
// const GridFsStorage = require("multer-gridfs-storage");
// const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
var auth = require('../config/auth');
var isDeveloper = auth.isDeveloper;
var isCompany = auth.isCompany;
var isUser = auth.isUser;


//first time login
router.get("/firstLogin", function (req, res) {
    res.render("firstLogin");
  });


 //login handling
router.post("/firstLogin", (req, res, next) => {
    passport.authenticate("local", {
      successRedirect: "/firstTimeLogin/firstTimeProfile",
      failureRedirect: "/firstLogin",
      failureFlash: true,
    })(req, res, next);
  });


router.get("/firstTimeProfile", (req, res) => {
    if(req.user.userType=="investor")
    res.redirect("/profileDetails/investorProfileDetails");
    else{
      res.redirect("/profileDetails/entrepreneurProfileDetails");
    }
  });  


module.exports = router;