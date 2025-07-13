import express from "express";
import { getQuotes, getQuote, createQuote, updateQuote, softDeleteQuote, recoverQuote, deleteQuote } from "../../controller/admin/quote-controller.js";
import { checkAuth } from "../../controller/auth/auth-controller.js";

const router = express.Router();

router.get("/", checkAuth, getQuotes);
router.get("/:id", checkAuth, getQuote);

router.post("/", checkAuth, createQuote);

router.put("/soft-delete", checkAuth, softDeleteQuote);
router.put("/recover", checkAuth, recoverQuote);

router.put("/:id", checkAuth, updateQuote);

router.delete("/", checkAuth, deleteQuote);

export default router;