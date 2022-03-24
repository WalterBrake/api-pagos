import { Router } from "express";
const router = Router();

import { createPayment, getPayments } from "../controllers/payment.controller";

//-> api/Payments/
router.post("/", createPayment);

router.get("/", getPayments);

export default router;
