const express = require('express');
const router = express.Router();
const {Movie, validate} = require('../models/movie');
const {Genre} = require('../models/genre');
 
router.get('/', async (req, res) => {
    const movies = await Movie.find().sort( { title: 1 } );
    res.send(movies);
});

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) res.status(404).send("The movie with the provided ID was not found.");

    res.send(movie);
})

router.post('/', async (req, res) => {
    const { errors } = validate(req.body);
    if (errors) res.status(400).send(errors);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');

    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    try {
        movie = await movie.save();
        res.send(movie);
    }
    catch (ex) {
        const errors = [];
        for (field in ex.errors) {
            errors.push(ex.errors[field].message);
        }
        res.status(400).send(errors);
    }
});

router.put('/:id', async (req, res) => {
    const {errors} = validate(req.body);
    if (errors) res.status(400).send(errors);

    let movie = await Movie.findById(req.params.id);
    if (!movie) res.status(404).send("The movie with the provided ID was not found.");

    movie.title = req.body.title || movie.title;
    movie.genre = req.body.genre || movie.genre;
    movie.numberInStock = req.body.numberInStock || movie.numberInStock;
    movie.dailyRentalRate = req.body.dailyRentalRate || movie.dailyRentalRate;

    try {
        movie = await movie.save();
        res.send(movie);
    }
    catch (ex) {
        const errors = [];
        for (field in ex.errors) {
            errors.push(ex.errors[field].message);
        }
        res.status(400).send(errors);
    }
});

router.delete("/:id", async (req, res) => {
    const movie = await Movie.findOneAndDelete( { _id: req.params.id } );

    if(!movie) return res.status(404).send("The movie with the provided ID was not found.");

    res.send(movie);
});


module.exports = router;