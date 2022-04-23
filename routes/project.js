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
router.post("/createProject", upload.single("file"), async(req, res) =>{
  
  let errors=[];
  
  const {name, shortBrief, description, amount, equity, contributors} = req.body;

  if (!name || !shortBrief || !description|| !req.file || !amount || !equity  ) {
      errors.push({ msg: "Please enter all fields" });
    }
  
    if (errors.length > 0) {
      res.render("createProject", {
        errors, //    if entries are not according to validation render filled fields
      });
    } else 
    
    
  {

  
  let contri=contributors.split(',');
  
  console.log(contri);
  const result = await cloudinary.uploader.upload(req.file.path);

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
          picture:result.secure_url,
          cloudinary_id:result.public_id
       } ,
      
       
    });
     
  project.save().then((user) => {
      req.flash("success_msg", "Project created");
      //res.redirect(""); //include msg.ejs wherever you want to see this msg
      console.log("successfully created");
  });

}
}


);  

 


module.exports = router;