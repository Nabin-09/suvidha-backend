import Bill from "./bill.model.js";

export const getBillsByService = async (req, res) => {
  const bills = await Bill.find({
    userId: req.user.userId,
    serviceType: req.params.serviceType
  });
  res.json(bills);
};

export const billHistory = async (req, res) => {
  const bills = await Bill.find({ userId: req.user.userId });
  res.json(bills);
};
