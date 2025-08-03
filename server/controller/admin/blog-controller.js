import Blog from "../../model/Blog.js";
import {
  imageUploadUtil,
  deleteCloudinaryImage,
} from "../../helper/cloudinary.js";

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({})
      .sort({ createdAt: -1 })
      .select("title description banner createdAt");

    res.status(200).json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);
    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, description, doc } = req.body;
    const files = req.files || {}; // expecting req.files.banner and req.files.gallery

    if (!title || !description || !files.banner?.[0]) {
      return res.status(400).json({
        success: false,
        message: "Title, description and banner are required.",
      });
    }

    // Upload banner image
    const bannerResult = await imageUploadUtil(
      files.banner[0].buffer,
      "blog/banner"
    );

    // Upload gallery images
    const gallery = [];
    if (files.gallery && files.gallery.length > 0) {
      for (const file of files.gallery) {
        const result = await imageUploadUtil(file.buffer, "blog/gallery");
        gallery.push(result.secure_url);
      }
    }

    const blog = await Blog.create({
      title,
      description,
      banner: bannerResult.secure_url,
      doc,
      gallery,
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.error("Create blog error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { title, description, doc, oldBanner, existingGallery } = req.body;
    const { blogId } = req.params;
    const files = req.files || {}; // expecting files.banner and files.gallery

    // Get the existing blog
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    const updatedFields = {};

    if (title) updatedFields.title = title;
    if (description) updatedFields.description = description;
    if (doc !== undefined) updatedFields.doc = doc;

    // === 1. Handle banner image update ===
    if (files.banner?.[0]) {
      if (oldBanner) {
        await deleteCloudinaryImage(oldBanner, "blog/banner");
      }
      const result = await imageUploadUtil(
        files.banner[0].buffer,
        "blog/banner"
      );
      updatedFields.banner = result.secure_url;
    } else if (oldBanner) {
      updatedFields.banner = oldBanner;
    }

    // === 2. Handle gallery image removal and new uploads ===
    let galleryToKeep = [];
    try {
      galleryToKeep = existingGallery ? JSON.parse(existingGallery) : [];
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid existingGallery format" });
    }

    // Delete removed images from Cloudinary
    const removedImages = blog.gallery.filter(
      (url) => !galleryToKeep.includes(url)
    );
    for (const imageUrl of removedImages) {
      await deleteCloudinaryImage(imageUrl, "blog/gallery");
    }

    // Add new gallery images
    if (files.gallery && files.gallery.length > 0) {
      for (const file of files.gallery) {
        const result = await imageUploadUtil(file.buffer, "blog/gallery");
        galleryToKeep.push(result.secure_url);
      }
    }

    updatedFields.gallery = galleryToKeep;

    // === 3. Save the updated blog ===
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, updatedFields, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error("Update blog error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    // Delete banner image from Cloudinary
    if (blog.banner) {
      await deleteCloudinaryImage(blog.banner, "blog/banner");
    }

    // Delete gallery images from Cloudinary
    for (const imageUrl of blog.gallery) {
      await deleteCloudinaryImage(imageUrl, "blog/gallery");
    }

    await Blog.findByIdAndDelete(blogId);

    res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully", blogId });
  } catch (error) {
    console.error("Delete blog error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
