import express from "express";
import { getUsers, updateUserRole, updateUser, deleteUser } from "../../controller/admin/user-controller.js";
import { checkAuth, isSuperAdmin } from "../../controller/auth/auth-controller.js";

const router = express.Router();

router.get("/", checkAuth, isSuperAdmin, getUsers);
router.put("/role", checkAuth, isSuperAdmin, updateUserRole);
router.put("/", checkAuth, updateUser);
router.delete("/", checkAuth, isSuperAdmin, deleteUser);

export default router;