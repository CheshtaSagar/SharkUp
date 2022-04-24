const express = require("express");
const router = express.Router();
var auth = require('../config/auth');
const upload = require("../config/multer");
const cloudinary = require("../config/cloudinary");
var isUser = auth.isUser;
const Investor = require("../models/Investor");
const Entrepreneur = require("../models/Entrepreneur");
const Project = require("../models/Project");


router.get("/investorDashboard", function (req, res) {
    

  Investor.findOne({ userDetails: req.user._id }).exec(function (err, docs) {
    if (err) {
      console.log(err);
    }
    else
    {
      Project.find().exec(function (err, projects) {
        if (err) {
          console.log(err);
        } else {
         
      res.render("investorDashboard", {
        user: req.user,
        inv: docs,
        projects:projects
      });
    }
  });
    }

  });
  });


 
router.get("/entrepreneurDashboard", function (req, res) {

   Entrepreneur.findOne({ userDetails: req.user._id }).exec(function (err, docs) {
    if (err) {
      console.log(err);
    }
    else
    {
      Project.find({ contributors : { $in: [docs._id]  }}).populate("contributors").exec(
        function (err, projects) {

          if(err)
          console.log(err);
          else
      res.render("entrepreneurDashboard", {
        user: req.user,
        entr: docs,
        projects: projects
      });
    });

  }
});

});


module.exports = router;