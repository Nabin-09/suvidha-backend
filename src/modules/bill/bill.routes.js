import express from "express";
import authenticate from "../../middlewares/authenticate.js";
import { getBillsByService, billHistory } from "./bill.controller.js";

const router = express.Router();

router.get("/:serviceType", authenticate, getBillsByService);
router.get("/history/all", authenticate, billHistory);

export default router;
