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

exports.Genre = Genre;
exports.validate = validateGenre;