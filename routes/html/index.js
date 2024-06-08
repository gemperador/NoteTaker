// Dependencies
const path = require('path');
const router = require('express').Router();

// Route to serve the notes HTML page
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

//route to serve the index HTML page
// This should be placed last to avoid conflicts with other routes
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;
