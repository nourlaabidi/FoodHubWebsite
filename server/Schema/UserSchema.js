const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name:{type: String, trim:true,required : [true, 'Please add a name']}, 
  password:{type: String, trim:true,required : [true, 'Please add a password']}, 
  email:{type: String, trim:true,required : [true, 'Please add an E-mail'],unique:true, match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please add a valid  E-mail']},
});

module.exports = mongoose.model("User", UserSchema);
