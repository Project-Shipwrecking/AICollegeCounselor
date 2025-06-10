const express = require('express');
const router = express.Router();

// Main route that renders the index.ejs view
router.get('/', (req, res) => {
    res.render('pages/index');
});

// Error handling route
router.use((req, res) => {
    res.status(404).render('pages/error');
});

module.exports = router;