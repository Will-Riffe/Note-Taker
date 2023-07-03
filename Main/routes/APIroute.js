// Le Dependencies
const router = require("express").Router();
const fs = require("fs");

const notes = require("../db/db.json")


// Settup for GET route
router.get("/notes", (req, res) => {
    res.json(notes);
})


// Settup for POST Route
router.post("/notes", (req, res) => {
    notes.push(req.body);

    // ID assignment
    notes.forEach((noteId, index) => {
        noteId.id = index + 1;
    });
    
    fs.writeFile("db/db.json", JSON.stringify(notes), (err) => {
        if(err) throw err;
    });
    
    res.json(true);
    res.end();
    
})


// Settup for DELETE Route
router.delete("/notes/:id", (req, res) => {
    console.log(req.params)
    const noteDelete = Number(req.params.id);
    const noteUpdate =
        notes.filter(notes => notes.id !== Number(noteDelete));

    fs.writeFile("db/db.json", JSON.stringify(noteUpdate), (err) => {
        if (err) throw err;
    });

    res.json(true);
    res.end();
})

module.exports = router;