const mongoose = require("mongoose");
const ProjectSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    dateOfCreation:
      {
        type: Date,
        default: Date.now,
      },
    shortBrief:
    {
        type:String,
        required: true,
    },
    demo:
    {
        video:{
            type: String,
         },
         cloudinary_id:{
            type:String,
         },
         required: true,
      
    },
    projectPicture:
    {
        picture:{
           type: String,
        },
        cloudinary_id:{
           type:String,
        },
        required: true,
    },
    ppt:{
        presentation:{
            type: String,
         },
         cloudinary_id:{
            type:String,
         },
         required: true,
    },
    basicDeal:{
        equity:{
            type: Number,
            required: true,
        },
        ammount:{
            type:Number,
            required: true,
        }
    },
    decription:{
      type: String,
    },
    contibutors:
    [{
             type: _mongoose2.default.Schema.Types.ObjectId,
             ref: 'Entrepreneur'
     }],
   like:
   {
       type:Number,
       default:0,
   },
   dislike:
   {
    type:Number,
    default:0,
   },
   requestedInvester:
    [{
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'Investor'
    }],
   confirmedInvester:{
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'Investor'

   }
    
  });
  
  const Project = mongoose.model("Project", ProjectSchema);
  
  module.exports = Project;