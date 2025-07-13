import express from "express";
import {
  register,
  login,
  logout,
  checkAuth,
  resetPassword,
} from "../../controller/auth/auth-controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check-auth", checkAuth, (req, res) => {
  const userId = req.userId;
  res
    .status(200)
    .json({ success: true, message: "User authenticated", userId });
});
router.post("/reset-password", resetPassword);

export default router;
