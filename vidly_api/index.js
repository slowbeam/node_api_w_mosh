const express = require('express');
const app = express();
const Joi = require('joi');

const genres = [
    { id: 1, name: "Horror" },
    { id: 2, name: "Action" },
    { id: 3, name: "Comedy" }
]

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema);
}

app.use(express.json());

app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find((g) => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("The genre with the provided ID was not found.");
    res.send(genre);
});

app.post('/api/genres', (req, res) => {
    const { errors } = validateGenre(req.body);
    if (errors) return res.status(400).send(errors);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(genre);
    res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
    const { errors } = validateGenre(req.body);
    if (errors) return res.status(400).send(errors);

    const genre = genres.find((g) => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("The genre with the provided ID was not found.");

    genre.name = req.body.name;
    res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find((g) => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("The genre with the provided ID was not found.");

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
})