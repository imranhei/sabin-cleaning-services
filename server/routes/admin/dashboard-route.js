import express from "express";
import { getDashboardData } from "../../controller/admin/dashboard-controller.js";
import { checkAuth } from "../../controller/auth/auth-controller.js";

const router = express.Router();

router.get("/", checkAuth, getDashboardData);

export default router;