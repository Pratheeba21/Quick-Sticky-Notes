const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Note = require("./model/Note");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://Pratheeba:PratheebaMongoDBAtlas@cluster0.ixnufht.mongodb.net/notesDB?appName=Cluster0",
  )
  .then(() => console.log("MongoDB Connected for Notes!"))
  .catch((err) => console.log("DB Connection Error:", err));

app.get("/notes", async (req, res) => {
  const notes = await Note.find().sort({ date: -1 });
  res.json(notes);
});

app.post("/notes", async (req, res) => {
  const newNote = new Note({ text: req.body.text });
  await newNote.save();
  res.json(newNote);
});

app.delete("/notes/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Note Deleted" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Notes Server running on port 3000"));
