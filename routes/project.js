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
const Project = require("../models/Project");
const Investor = require("../models/Investor");
const Entrepreneur = require("../models/Entrepreneur");
const crypto = require("crypto"); //to generate file names
const multer = require("multer");
// const GridFsStorage = require("multer-gridfs-storage");
// const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
var auth = require('../config/auth');
const upload = require("../config/multer");
const cloudinary = require("../config/cloudinary");

var isUser = auth.isUser;


//first time login
router.get("/createProject", function (req, res) {
    res.render("createProject");
  });


//for saving investor's data after first login
router.post("/createProject", upload.fields([
  { name: "file", maxCount: 1 },
  { name: "file1", maxCount: 1 },
  { name: "file2", maxCount: 1 },
]), async(req, res) =>{
  
  let errors=[];
  
  const {name, shortBrief, description, amount, equity, contributors} = req.body;

  if (!name || !shortBrief || !description||!amount || !equity  ) {
      errors.push({ msg: "Please enter all fields" });
    }
    if (!req.files["file"] || !req.files["file1"] || !req.files["file2"] ) {
      errors.push({ msg: "Please upload all images" });
    }
    if (errors.length > 0) {
      res.render("createProject", {
        errors, //    if entries are not according to validation render filled fields
      });
    } else 
    
    
  {

  
  let contri=contributors.split(',');
  contri.push(req.user.email);

  console.log(contri);

  const docs = await Entrepreneur.find({ email: { $in: contri }});
  const curEntr=await Entrepreneur.findOne({ userDetails: req.user });
  const result1 = await cloudinary.uploader.upload(req.files["file"][0].path);

  const result2= await cloudinary.uploader.upload(req.files["file1"][0].path);

  const result3= await cloudinary.uploader.upload(req.files["file2"][0].path);

  const project = new Project({
      name: name,
      shortBrief: shortBrief,
      description: description,
      basicDeal:{
        equity: equity,
        amount: amount,
      },
      projectPicture: 
      {
          picture:result1.secure_url,
          cloudinary_id:result1.public_id
       } ,
       demo:
       {
         video:result2.secure_url,
         cloudinary_id:result2.public_id

       },
       ppt:{
         presentation:result3.secure_url,
         cloudinary_id:result3.public_id
       },

      createdBy: curEntr.id,
      contributors:docs
       
    });
     
  project.save().then((user) => {
      req.flash("success_msg", "Project created");
      res.redirect("/dashboard/entrepreneurDashboard"); //include msg.ejs wherever you want to see this msg
      console.log("project successfully created");
  });

}
}


);  

 
router.get("/publicProject/:id", function (req, res) {
  res.render("publicProject");
});

router.get("/entrProject/:id", function (req, res) {
  res.render("project");
});



module.exports = router;