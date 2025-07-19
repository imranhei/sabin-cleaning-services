import Quote from "../../model/Quote.js";

export const createQuote = async (req, res) => {
  try {
    const { name, email, phone, address, msg } = req.body;
    const quote = new Quote({
      name,
      email,
      phone,
      address,
      msg,
    });
    await quote.save();
    res.status(201).json({
      success: true,
      message: "Quote created successfully",
      quote: {
        name,
        email,
        phone,
        address,
        msg,
      },
    });
  } catch (error) {
    // Handle validation error from Mongoose
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors, // example: ["Path `phone` is required."]
      });
    }

    console.error("Create Quote Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getQuotes = async (req, res) => {
  try {
    const trashed = req.query.trashed === "true";
    const status = req.query.status;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Base filter
    const filter = { isDeleted: trashed };
    if (status !== "all") filter.status = status;

    const [quotes, totalCount] = await Promise.all([
      Quote.find(filter)
        .select("-email -phone -address -isDeleted -deletedAt")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Quote.countDocuments(filter)
    ]);

    res.status(200).json({ success: true, quotes, totalCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const quote = await Quote.findById(id);

    if (!quote) {
      return res
        .status(404)
        .json({ success: false, message: "Quote not found" });
    }

    // If the quote is unread, mark it as read
    if (quote.isRead === false) {
      quote.isRead = true;
      await quote.save(); // Save the updated status
    }

    res.status(200).json({ success: true, quote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = {};

    // Add or update note
    if (req.body.note !== undefined) {
      updateFields.note = req.body.note;
    }

    // Add or update favorite status
    if (req.body.status !== undefined) {
      updateFields.status = req.body.status;
    }

    const updatedQuote = await Quote.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedQuote) {
      return res
        .status(404)
        .json({ success: false, message: "Quote not found" });
    }

    res.status(200).json({ success: true, data: updatedQuote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const softDeleteQuote = async (req, res) => {
  try {
    const body = req.body || {};
    const { ids } = body;

    if (Array.isArray(ids) && ids.length > 0) {
      await Quote.updateMany({ _id: { $in: ids } }, { isDeleted: true });
      return res
        .status(200)
        .json({ success: true, message: "Quotes deleted successfully" });
    }

    return res
      .status(400)
      .json({ success: false, message: "No ID(s) provided" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const recoverQuote = async (req, res) => {
  try {
    const body = req.body || {};
    const { ids } = body;

    if (Array.isArray(ids) && ids.length > 0) {
      await Quote.updateMany({ _id: { $in: ids } }, { isDeleted: false });
      return res
        .status(200)
        .json({ success: true, message: "Quotes recovered successfully" });
    }

    return res
      .status(400)
      .json({ success: false, message: "No ID(s) provided" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteQuote = async (req, res) => {
  try {
    const { ids } = req.body;

    if (Array.isArray(ids) && ids.length > 0) {
      // Multiple delete
      await Quote.deleteMany({ _id: { $in: ids } });
      return res
        .status(200)
        .json({ success: true, message: "Quotes deleted successfully" });
    }

    return res
      .status(400)
      .json({ success: false, message: "No ID(s) provided" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
