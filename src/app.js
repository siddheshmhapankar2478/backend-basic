const express = require("express");

const app = express();

app.use(express.json());

const notesRoutes = require("./routes/notes.routes");
app.use("/", notesRoutes);

module.exports = app;
