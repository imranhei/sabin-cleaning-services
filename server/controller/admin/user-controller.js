import User from "../../model/User.js";
import {
  imageUploadUtil,
  deleteCloudinaryImage,
} from "../../helper/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ success: true, users: users });
  } catch (error) {
    console.log(error);
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { id, role } = req.body;

    if (req.user._id === id) {
      return res.status(403).json({
        success: false,
        message: "You cannot update your own role",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({ success: true, updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name } = req.body;
    const { _id } = req.user; // authenticated user ID
    const file = req.file;

    const user = await User.findById(_id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let updatedFields = {};

    if (name) updatedFields.name = name;

    if (file) {
      if (user.pro_pic) {
        await deleteCloudinaryImage(user.pro_pic);
      }

      const result = await imageUploadUtil(file.buffer, "pro_pic");
      updatedFields.pro_pic = result.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(_id, updatedFields, {
      new: true,
    }).select("-password");

    res
      .status(200)
      .json({
        success: true,
        message: "User updated successfully",
        user: updatedUser,
      });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user to be deleted
    const userToDelete = await User.findById(id);

    if (!userToDelete) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isSelf = id === req.user._id;

    // Block deleting a super-admin unless deleting own account
    if (userToDelete.role === "super-admin" && !isSelf) {
      return res.status(403).json({
        success: false,
        message: "You cannot delete a super-admin",
      });
    }

    // Allow self-deletion (admin or super-admin), or any admin deleting non-super-admin
    const deletedUser = await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      deletedUser,
    });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
