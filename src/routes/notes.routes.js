const { v4: uuidv4 } = require("uuid");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ success: true, data: "Hello World" });
});

const notesList = [];

router.get("/notes", (req, res) => {
  res.status(200).json({ success: true, data: notesList });
});

router.post("/notes", (req, res) => {
  const reqBody = req.body;
  const { name, is_completed, description } = reqBody || {};
  if (!name || is_completed === undefined || !description)
    return res.status(400).json({
      success: false,
      error: "name, description and is_completed are required",
    });

  notesList.push({ id: uuidv4(), name, description });
  res.status(201).json({ success: true, data: "Note Added Successfully" });
});

router.put("/notes/:id", (req, res) => {
  const { id } = req.params;
  if (!id)
    return res.status(400).json({ success: false, message: "Invalid ID" });

  const { name, is_completed, description } = req.body || {};
  if (!name || is_completed === undefined || !description)
    return res.status(400).json({
      success: false,
      error: "name, description and is_completed are required",
    });

  const index = notesList.findIndex((note) => note.id === id);

  if (index !== -1) {
    notesList[index] = { id, name, description };
    res.status(200).json({ success: true, data: "Note Updated Successfully" });
  } else {
    res.status(404).json({ success: false, data: "Note not found" });
  }
});

router.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  if (!id)
    return res.status(400).json({ success: false, message: "Invalid ID" });

  const index = notesList.findIndex((note) => note.id === id);

  if (index !== -1) {
    notesList.splice(index, 1);
    res.status(200).json({ success: true, data: "Note Deleted Successfully" });
  } else {
    res.status(404).json({ success: false, data: "Note not found" });
  }
});

module.exports = router;
