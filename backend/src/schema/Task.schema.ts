import mongoose from "mongoose";

const SChema = mongoose.Schema;

const TaskSchema = new SChema({
  title: { type: String, required: true },
  description: { type: String, default: null },
  assignedTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  dueDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["pending", "in progress", "completed"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;
