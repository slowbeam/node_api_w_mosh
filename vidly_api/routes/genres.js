const express = require('express');
const router = express.Router();
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

router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:id', (req, res) => {
    const genre = genres.find((g) => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("The genre with the provided ID was not found.");
    res.send(genre);
});

router.post('/', (req, res) => {
    const { errors } = validateGenre(req.body);
    if (errors) return res.status(400).send(errors);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(genre);
    res.send(genre);
});

router.put('/:id', (req, res) => {
    const { errors } = validateGenre(req.body);
    if (errors) return res.status(400).send(errors);

    const genre = genres.find((g) => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("The genre with the provided ID was not found.");

    genre.name = req.body.name;
    res.send(genre);
});

router.delete('/:id', (req, res) => {
    const genre = genres.find((g) => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("The genre with the provided ID was not found.");

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
});

module.exports = router;