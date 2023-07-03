// Le Dependencies
const router = require("express").Router();
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
    
    fs.writeFile("db/db.json", JSON.stringify(notepad), (err) => {
        if(err) throw err;
    });
    
    res.json(true);
    res.end();
    
})


// Settup for DELETE Route
router.delete("/notepad/:id", (req, res) => {
    console.log(req.params)
    const noteDelete = Number(req.params.id);
    const noteUpdate =
        notepad.filter(notepad => notepad.id !== Number(noteDelete));

    fs.writeFile("db/db.json", JSON.stringify(noteUpdate), (err) => {
        if (err) throw err;
    });

    res.json(true);
    res.end();
})

module.exports = router;