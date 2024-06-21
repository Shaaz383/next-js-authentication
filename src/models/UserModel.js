import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    required: [true, "Please enter username"],
  },
  email:{
    type: String,
    required: [true, "Please enter email"],
  },
  password:{
    type: String,
    required: [true, "Please enter password"],
  },
  isVerified:{
    type:Boolean,
    default:false
  },
  isAdmin:{
    type:Boolean,
    default:false
  },
  forgetPasswordToken:String,
  forgetPasswordTokenExpire:Date,
  verifyToken:String,
  verifyTokenExpire:Date

})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User