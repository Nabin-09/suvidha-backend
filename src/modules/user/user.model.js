import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    phone: { type: String, unique: true },
    role: {
      type: String,
      enum: ["citizen", "admin", "operator"],
      default: "citizen"
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
