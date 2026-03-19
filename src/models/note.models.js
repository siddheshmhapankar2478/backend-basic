const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  name: String,
  description: String,
  is_completed: Boolean,
});
const noteModel = mongoose.model("note", noteSchema);

module.exports = noteModel;
