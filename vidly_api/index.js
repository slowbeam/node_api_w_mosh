const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

mongoose.connect( mongoURI, {useNewUrlParser: true})
            .then(() => console.log('Connected to MongoDB...'))
            .catch((error) => console.log('Could not connect to MongoDB'));

app.use(express.json());

// Routes
app.use('/api/genres', genres);
app.use('/api/customers', customers);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log(`Server running on port ${PORT}...`); });