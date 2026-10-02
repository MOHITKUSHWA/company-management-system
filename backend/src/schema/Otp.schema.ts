import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OtpSchema = new Schema({
  email: String,
  otp: String,
  createdAt:{
    type: Date,
    default: Date.now,
    expires: 60
  },
  role:{
    type: String,
    enum: ["employee", "company"],
  }
});

const Otp = mongoose.model("Otp", OtpSchema);
export default Otp;