import express from "express";
import { trackVisitor, getTotalVisitors, getWeeklyVisitors, getMonthlyVisitors, getYearlyVisitors } from "../controller/actualVisitor_controller.js";

const router = express.Router();

router.post("/", trackVisitor);
router.get("/total", getTotalVisitors);
router.get("/week", getWeeklyVisitors);
router.get("/month", getMonthlyVisitors);
router.get("/year", getYearlyVisitors);

export default router;
