// Setting up dependencies
const router = require("express").Router();
const db = require("../db/db.json");
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");

router.get("/notes", (req, res) => {
    res.json(db);
  });
  
  router.post("/notes", (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();
    db.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(db), err => {
      if (err) throw err;
      res.json(newNote);
    });
  });
  
  router.delete("/notes/:id", (req, res) => {
    const noteId = req.params.id;
    const noteIndex = db.findIndex(note => note.id === noteId);
    if (noteIndex !== -1) {
      db.splice(noteIndex, 1);
      fs.writeFile("./db/db.json", JSON.stringify(db), err => {
        if (err) throw err;
        res.json({ message: "Note deleted successfully" });
      });
    } else {
      res.status(404).json({ error: "Note not found" });
    }
  });
  
  module.exports = router;