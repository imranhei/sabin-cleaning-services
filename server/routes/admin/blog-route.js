import express from "express";
import {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../../controller/admin/blog-controller.js";
import { checkAuth } from "../../controller/auth/auth-controller.js";
import { upload } from "../../helper/cloudinary.js";

const router = express.Router();

router.get("/", checkAuth, getBlogs);
router.get("/:blogId", checkAuth, getBlog);
router.post(
  "/",
  checkAuth,
  upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  createBlog
);
router.put(
  "/:blogId",
  checkAuth,
  upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  updateBlog
);
router.delete("/:blogId", checkAuth, deleteBlog);

export default router;