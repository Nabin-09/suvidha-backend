import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    serviceType: String,
    category: String,
    description: String,
    attachments: [String],
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Complaint", complaintSchema);
