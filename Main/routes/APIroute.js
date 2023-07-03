// Le Dependencies
const router = require("express").router();
const fs = require("fs");

const notepad = require("../db/db.json")


// Settup for GET route
router.get("/notepad", (req, res) => {
    res.json(notepad);
})


// Settup for POST Route
router.post("/notepad", (req, res) => {
    notepad.push(req.body);

    // ID assignment
    notepad.forEach((noteId, index) => {
        noteId.id = index + 1;
    });
    
    fs.writeFile("../db/db.json", JSON.stringify(notepad), (err) => {
        if(err) throw err;
    });
    
    res.json(true);
    res.end();
    
})


// Settup for DELETE Route
router.delete("/api/notes/:id", (req, res) => {

    const noteDelete = Number(req.params.id);
    const noteUpdate =
        notepad.filter(note => note.id !== Number(noteDelete));

    fs.writeFile("../db/db.json", JSON.stringify(noteUpdate), (err) => {
        if (err) throw err;
    });

    res.json(true);
    res.end();
})

