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


router.get("/:id",(req, res) =>{

    Project.findOne({ id : req.params.id }).populate("contributors").exec(
        function (err, project) {
    
          if(err)
          console.log(err);
          else
          {
    Investor.findOneAndUpdate(
        { userDetails: req.user._id },
        {
          $push: {
            pastInvestments: project
          },
        },
        { new: true },
        function (err, docs) {
          if (err) {
            console.log(err);
            throw err;
          } else 
            {
            console.log(docs); 
            console.log(req.params.id);
             
            req.flash(
                "success_msg",
                "Investment made"
              );
              res.redirect("/dashboard/investorDashboard");

            }
        });
    }

});

});




module.exports = router;