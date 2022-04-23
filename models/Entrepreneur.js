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
     
    
      website: {
        type: String
      },
    
      photo: {
        type: String
      },
    
      bio: {
        type: String
      },
    
      address: {
        type: String
      },
    
    //   backedProjects: [{
    //     type: _mongoose2.default.Schema.Types.ObjectId,
    //     ref: 'Project'
    //   }],
});

const Entrepreneur = mongoose.model("Entrepreneur", EntrepreneurSchema);

module.exports = Entrepreneur;
