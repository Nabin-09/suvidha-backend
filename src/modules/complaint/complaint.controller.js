import Complaint from "./complaint.model.js";

export const createComplaint = async (req, res) => {
  const complaint = await Complaint.create({
    ...req.body,
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
