import express from "express";
import authenticate from "../../middlewares/authenticate.js";
import authorizeRoles from "../../middlewares/authorizeRoles.js";
import {
  createComplaint,
  myComplaints,
  allComplaints,
  updateStatus
} from "./complaint.controller.js";

const router = express.Router();

router.post("/", authenticate, createComplaint);
router.get("/my", authenticate, myComplaints);

router.get("/admin", authenticate, authorizeRoles("admin", "operator"), allComplaints);
router.patch(
  "/admin/:id/status",
  authenticate,
  authorizeRoles("admin", "operator"),
  updateStatus
);

export default router;
