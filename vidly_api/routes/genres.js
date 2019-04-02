const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(5).max(50).required()
    };

    return Joi.validate(genre, schema);
}

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        minlength: 5,
        maxLength: 50
    }
}));

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', async (req, res) => {  
    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send("The genre with the provided ID was not found.");
    res.send(genre);
});

router.post('/', async (req, res) => {
    const { errors } = validateGenre(req.body);
    if (errors) return res.status(400).send(errors);

    let genre = new Genre({ name: req.body.name });

    genre = await genre.save();
    res.send(genre);  
});

router.put('/:id', async (req, res) => {  
    const { errors } = validateGenre(req.body);
    if (errors) return res.status(400).send(errors);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });

    if(!genre) return res.status(404).send("The genre with the provided ID was not found.");
    res.send(genre);      
});

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove( req.params.id );

    if(!genre) return res.status(404).send("The genre with the provided ID was not found.");

    res.send(genre);
});

module.exports = router;