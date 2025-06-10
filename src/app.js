// filepath: express-ejs-app/src/app.js

const express = require('express');
const path = require('path');
const routes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware for serving static files
app.use(express.static(path.join(__dirname, '../public')));

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));

// Set up routes
app.use('/', routes);

// Error handling
app.use((req, res, next) => {
    res.status(404).render('pages/error', { message: 'Page not found' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});