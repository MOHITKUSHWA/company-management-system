import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RollScheama = new Schema(
  {
    name: { type: String, required: true },
    permissions: { type: String, required: true },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);


const Role = mongoose.model("Role", RollScheama);

export default Role;