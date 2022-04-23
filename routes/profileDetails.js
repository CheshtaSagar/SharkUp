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
const multer = require("multer");
// const GridFsStorage = require("multer-gridfs-storage");
// const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
var auth = require('../config/auth');
const upload = require("../config/multer");
const cloudinary = require("../config/cloudinary");
var isUser = auth.isUser;
const Investor = require("../models/Investor");
const Entrepreneur = require("../models/Entrepreneur");



//first time login
router.get("/investorProfileDetails", function (req, res) {
    res.render("investorProfileDetails");
  });


 
//first time login
router.get("/entrepreneurProfileDetails", function (req, res) {
    res.render("entrepreneurProfileDetails");
  });



//for saving investor's data after first login
router.post("/investorProfileDetails", upload.single("file"), async(req, res) =>{
  
    let errors=[];

    if (!req.body.email || !req.body.name || !req.body.bio|| !req.file || !req.body.aadhar || !req.body.pan || 
        !req.body.areaOfExpertise ) {
        errors.push({ msg: "Please enter all fields" });
      }
    
      if (errors.length > 0) {
        res.render("register", {
          errors, //    if entries are not according to validation render filled fields
        });
      } else 
      
      
    {
    const result = await cloudinary.uploader.upload(req.file.path);

    const investor = new Investor({
        name: req.body.name,
        email: req.body.email,
        aadhar: req.body.aadhar,
        userDetails:req.user,
        pan: req.body.pan,
        areaOfExpertise: req.body.areaOfExpertise,
        displayPicture: 
        {
            image:result.secure_url,
            cloudinary_id:result.public_id
         } ,
        bio:req.body.bio, 
      });
       
    investor.save().then((user) => {
        req.flash("success_msg", "Profile completed ");
        res.redirect("/dashboard/investorDashboard"); //include msg.ejs wherever you want to see this msg
        console.log("successfully posted");
    });

}
});



//for saving investor's data after first login
router.post("/entrepreneurProfileDetails", upload.single("file"), async(req, res) =>{
  
  let errors=[];
  
  const {email, name, bio, aadhar, pan, website } = req.body;

  if (!email || !name || !bio|| !req.file || !aadhar || !pan || 
      !website ) {
      errors.push({ msg: "Please enter all fields" });
    }
  
    if (errors.length > 0) {
      res.render("register", {
        errors, //    if entries are not according to validation render filled fields
      });
    } else 
    
    
  {
  const result = await cloudinary.uploader.upload(req.file.path);

  const entrepreneur = new Entrepreneur({
      name: name,
      email: email,
      aadhar: aadhar,
      userDetails:req.user,
      pan: pan,
      website: website,
      displayPicture: 
      {
          image:result.secure_url,
          cloudinary_id:result.public_id
       } ,
      bio:req.body.bio, 
    });
     
  entrepreneur.save().then((user) => {
      req.flash("success_msg", "Profile completed ");
      res.redirect("/dashboard/entrepreneurDashboard"); //include msg.ejs wherever you want to see this msg
      console.log("successfully created");
  });

}
}


);


module.exports = router;