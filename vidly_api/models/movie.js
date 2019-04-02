const mongoose = require('mongoose');
const Joi = require('joi');
const {Genre} = require('./genre');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        minlength: 5,
        maxLength: 50
    }
});

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    genre: genreSchema,
    numberInStock: {
        type: Number,
        default: 0
    },
    dailyRentalRate: {
        type: Number,
        default: 0
    }
})

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(5).max(5).required(),
        genre: Joi.string().min(5).max(5).required(),
        numberInStock: Joi.number(),
        dailyRentalRate: Joi.number()
    };

    return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;