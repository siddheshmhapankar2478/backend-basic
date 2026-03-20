const noteModel = require("../models/note.models");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ success: true, data: "Hello World" });
});

router.get("/notes", async (req, res) => {
  const notesList = await noteModel.find();
  res.status(200).json({ success: true, data: notesList });
});

router.post("/notes", async (req, res) => {
  const { name, is_completed, description } = req.body || {};
  if (!name || is_completed === undefined || !description)
    return res.status(400).json({
      success: false,
      error: "name, description and is_completed are required",
    });

  await noteModel.create({ name, is_completed, description });

  res.status(201).json({ success: true, data: "Note Added Successfully" });
});

router.put("/notes/:id", async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res.status(400).json({ success: false, message: "Invalid ID" });

  const { name, is_completed, description } = req.body || {};
  if (!name || is_completed === undefined || !description)
    return res.status(400).json({
      success: false,
      error: "name, description and is_completed are required",
    });

  await noteModel.findOneAndUpdate(
    { _id: id },
    { name, is_completed, description },
  );

  return res
    .status(200)
    .json({ succes: true, message: "Note Updated Successfully" });
});

router.delete("/notes/:id", async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res.status(400).json({ success: false, message: "Invalid ID" });

  await noteModel.findOneAndDelete({ _id: id });

  return res
    .status(200)
    .json({ succes: true, message: "Note Deleted Successfully" });
});

module.exports = router;
