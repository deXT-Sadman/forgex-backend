const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const taskSchema = new mongoose.Schema(
  {
    localId: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "inProgress", "completed", "cancelled"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    dueDate: { type: Date, default: null },
  },
  { timestamps: true },
);

// Create a static method to generate a unique localId for each task
taskSchema.statics.generateLocalId = async function () {
  let uniqueId;
  let isUnique = false;

  while (!isUnique) {
    uniqueId = uuidv4();
    const existingTask = await this.findOne({ localId: uniqueId });
    if (!existingTask) {
      isUnique = true;
    }
  }

  return uniqueId;
};

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
