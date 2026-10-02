import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CompanySchema = new Schema(
  {
    companyName: { type: String, required: true },
    nameOfOwner: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String, default: null },
    isVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const Company = mongoose.model("Company", CompanySchema);

export default Company;
