import mongoose from "mongoose";

const Schema = mongoose.Schema;

const planingStatus = ["Planning", "Active", "On Hold", "Completed"];

const ProjectSchema = new Schema({
  projectName: { type: String, required: true },
  description: { type: String, default: null },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: planingStatus, default: "Planning" },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  userIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Project = mongoose.model("Project", ProjectSchema);

export default Project;
