
const mongoose = require("mongoose");

const InvestorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
  areaOfExpertise:
  {
    type: String,
  },
  pastInvestments:
  [

    {
        projectName:
        {
            type: String
        },
        
    }
]

  
});

const Investor = mongoose.model("Investor", InvestorSchema);

module.exports = Investor;