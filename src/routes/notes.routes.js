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
  const { name, status } = reqBody || {};
  if (!name || !status)
    return res
      .status(400)
      .json({ success: false, error: "Name and Status are required" });

  notesList.push({ id: notesList.length + 1, name, status });
  res.status(201).json({ success: true, data: "Note Added Successfully" });
});

router.put("/notes/:id", (req, res) => {
  const reqBody = req.body;
  const id = Number(req.params.id);
  if (isNaN(id))
    return res.status(400).json({ success: false, message: "Invalid ID" });

  const { name, status } = reqBody || {};
  if (!name || !status)
    return res
      .status(400)
      .json({ success: false, error: "Name and Status are required" });

  const index = notesList.findIndex((note) => note.id === id);

  if (index !== -1) {
    notesList[index] = { id, name, status };
    res.status(200).json({ success: true, data: "Note Updated Successfully" });
  } else {
    res.status(404).json({ success: true, data: "Note not found" });
  }
});

router.delete("/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id))
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
