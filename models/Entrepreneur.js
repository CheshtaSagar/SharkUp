//User Schema

const mongoose = require("mongoose");

const EntrepreneurSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
    userDetails:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:'User'
    },
    email:
    {
      type:String,
    },
    rating:
    {
     type:Number,
     default:2,
    },
    displayPicture:
    {
        image:{
           type: String,
        },
        cloudinary_id:{
           type:String,
        }
    },

    aadhar:{
      type: String,
      required: true,
    },
    pan:{
      type: String,
    },
    bio:{
      type: String,
    },
    
      website: {
        type: String
      }
    //   backedProjects: [{
    //     type: _mongoose2.default.Schema.Types.ObjectId,
    //     ref: 'Project'
    //   }],
});

const Entrepreneur = mongoose.model("Entrepreneur", EntrepreneurSchema);

module.exports = Entrepreneur;
