import Complaint from "./complaint.model.js";
import cloudinary from "../../utils/cloudinary.js";

export const createComplaint = async (req, res) => {
  let attachments = [];

  if (req.files) {
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`
      );
      attachments.push(result.secure_url);
    }
  }

  const complaint = await Complaint.create({
    ...req.body,
    attachments,
    userId: req.user.userId
  });

  res.status(201).json(complaint);
};

export const myComplaints = async (req, res) => {
  const complaints = await Complaint.find({ userId: req.user.userId });
  res.json(complaints);
};

export const allComplaints = async (req, res) => {
  const complaints = await Complaint.find();
  res.json(complaints);
};

export const updateStatus = async (req, res) => {
  const { status } = req.body;
  const complaint = await Complaint.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  res.json(complaint);
};
