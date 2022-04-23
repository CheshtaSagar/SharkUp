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
const Investor = require("../models/Investor");
const Entrepreneur = require("../models/Entrepreneur");
var isUser = auth.isUser;


// Grid.mongo = mongoose.mongo;

//rendering home page
router.get("/", (req, res) => {
  res.render("index");
});

//login
router.get("/login", function (req, res) {
  res.render("login");
});




//register
router.get("/register", function (req, res) {
  res.render("register");
});

//forget password route
router.get('/forgetPassword',function(req,res){
  res.render('forgetPassword',{
    user:req.user
  });
});

//Update password route
router.get('/updatePassword',function(req,res){
  res.render('updatePassword',{
    user:req.user
  });
});


//Register post Handling
router.post("/register", (req, res) => {
  const { email, userType, password, password2 } = req.body;
  let errors = [];
//validation for email
  function isLowerCase(str) {
    return str === str.toLowerCase();
}


  //Validations for registration form
  if (!email || !userType || !password || !password2) {
    errors.push({ msg: "Please enter all fields" });
  }

  if(!isLowerCase(email))
  {
    errors.push({ msg: "Email cannot be in upper case" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 5) {
    errors.push({ msg: "Password must be at least 5 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors, //    if entries are not according to validation render filled fields
      email,
      userType,
      password,
      password2,
    });
  } else {
    //if Validations passed
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push("Email is already Exists");
        res.render("register", {
          errors,
          email,
          userType, //if email already exists render the fields
          password,
          password2,
        });
      } else {
        const newUser = new User({
          email,
          userType, ///if all validation passed store a new User indb
          password,
        });

        //to save password in hash format(pass the plain password and hash will be the encyrpted password)
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            //set password to hash
            newUser.password = hash;
            //save the developer
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "Registered Successfully and can log in "
                );
                res.redirect("/login");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});




//login handling
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
});


  router.get("/profile", (req, res) => {
    if(req.user.userType=="investor")
    res.redirect("/investorProfile");
    else{
      res.redirect("/entrepreneurProfile");
    }
  });




router.get("/entrepreneurProfile", function (req, res) {

 
  Entrepreneur.findOne({ userDetails: req.user._id }).exec(function (err, docs) {
    if (err) {
      console.log(err);
    }
    if (!docs)
      //if user logs in for the first time,redirect him to edit profile section
      res.redirect("/profileDetails/entrepreneurProfileDetails");
    else
      res.render("entrepreneurProfile", {
        user: req.user,
        
      });
  });
});
  


router.get("/investorProfile", (req, res) => {
 
  Investor.findOne({ userDetails: req.user._id }).exec(function (err, docs) {
    if (err) {
      console.log(err);
    }
    if (!docs)
      //if user logs in for the first time,redirect him to edit profile section
      res.redirect("/profileDetails/investorProfileDetails");
    else
      res.render("investorProfile", {
        user: req.user,
        
      });
});


});



// Logout handling
router.get("/logout", (req, res) => {
  req.logout(); //passport middleware function
  req.flash("success_msg", "You are logged out");
  res.redirect("/login");
});

module.exports = router;
