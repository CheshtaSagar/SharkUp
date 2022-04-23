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
         }
      
    },
    projectPicture:
    {
        picture:{
           type: String,
        },
        cloudinary_id:{
           type:String,
        },
       
    },
    ppt:{
        presentation:{
            type: String,
         },
         cloudinary_id:{
            type:String,
         },
         
    },
    basicDeal:{
        equity:{
            type: Number,
            required: true,
        },
        amount:{
            type:Number,
            required: true,
        }
    },
    description:{
      type: String,
    },
    contributors:
    [{
             type: mongoose.Schema.Types.ObjectId,
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
   requestedInvestor:
    [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Investor'
    }],
   confirmedInvestor:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Investor'

   }
    
  });
  
  const Project = mongoose.model("Project", ProjectSchema);
  
  module.exports = Project;