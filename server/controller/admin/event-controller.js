import Event from "../../model/Event.js";

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({}).sort({ createdAt: -1 }).lean();
    res.status(200).json({ seccess: true, events });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createEvent = async (req, res) => {
  try {
    const { title, start, end, allDay, description } = req.body;
    const newEvent = await Event.create({
      title,
      start,
      end,
      allDay,
      description,
    });
    res.status(201).json({ success: true, newEvent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, start, end, allDay, description } = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { title, start, end, allDay, description },
      { new: true }
    );
    res.status(200).json({ success: true, updatedEvent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);
    res.status(200).json({ success: true, deletedEvent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
