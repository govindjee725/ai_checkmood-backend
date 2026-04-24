import express from "express";
import {
analyzeMood,
getHistory,
deleteEntry
} from "../controllers/journalController.js";

const router = express.Router();

router.post("/analyze", analyzeMood);
router.get("/history", getHistory);
router.delete("/history/:id", deleteEntry);

export default router;