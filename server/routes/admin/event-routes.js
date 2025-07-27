import express from "express";
import { getEvents, createEvent, updateEvent, deleteEvent } from "../../controller/admin/event-controller.js";
import { checkAuth } from "../../controller/auth/auth-controller.js";

const router = express.Router();

router.get("/", checkAuth, getEvents);
router.post("/", checkAuth, createEvent);
router.put("/:id", checkAuth, updateEvent);
router.delete("/:id", checkAuth, deleteEvent);

export default router;