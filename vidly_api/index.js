const express = require('express');
const app = express();
const genres = require('./routes/genres');

app.use(express.json());

// Routes
app.use('/api/genres', genres);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log(`Server running on port ${PORT}...`); });