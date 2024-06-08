const router = require('express').Router();
const fs = require('fs').promises;
const uniqid = require('uniqid');

// GET /api/notes should read the db.json file and return all saved notes as JSON.
router.get('/api/notes', async (req, res) => {
    try {
        // Read the db.json file
        const data = await fs.readFile("./db/db.json", 'utf8');
        // Parse the data to JSON
        const notes = JSON.parse(data);
        // Return the notes as JSON
        res.json(notes);
    } catch (err) {
        // Handle any errors that occur
        res.status(500).json({ error: 'Failed to read notes' });
    }
});

// POST /api/notes should receive a new note to save on the request body,
// add it to the db.json file, then return the new note
router.post('/api/notes', async (req, res) => {
    const newNote = {
        id: uniqid(),
        title: req.body.title,
        text: req.body.text
    };
    try {
        // Read the db.json file
        const data = await fs.readFile("./db/db.json", 'utf8');
        // Parse the data to JSON
        const notes = JSON.parse(data);
        // Add the new note to the list of notes
        notes.push(newNote);
        // Write the updated list of notes back to the db.json file
        await fs.writeFile("./db/db.json", JSON.stringify(notes, null, 2));
        // Return the new note
        res.json(newNote);
    } catch (err) {
        // Handle any errors that occur
        res.status(500).json({ error: 'Failed to save note' });
    }
});

// DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete
router.delete('/api/notes/:id', async (req, res) => {
    try {
        // Read the db.json file
        const data = await fs.readFile("./db/db.json", 'utf8');
        // Parse the data to JSON
        let notes = JSON.parse(data);
        // Filter out the note with the specified id
        notes = notes.filter(note => note.id !== req.params.id);
        // Write the updated list of notes back to the db.json file
        await fs.writeFile("./db/db.json", JSON.stringify(notes, null, 2));
        // Return a success message
        res.json({ message: 'Note successfully deleted' });
    } catch (err) {
        // Handle any errors that occur
        res.status(500).json({ error: 'Failed to delete note' });
    }
});

module.exports = router;
