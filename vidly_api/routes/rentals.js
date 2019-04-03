const express = require('express');
const router = express.Router();
const {Rental} = require('../models/rental');

router.post('/', async (req, res) => {
    const rental = new Rental ({
        customer: req.body.customerId,
        movie: req.body.movieId
    });

    const result = await rental.save();

    res.send(result);
});

router.get('/', async (req, res) => {
    const rentals = await Rental.find();
    res.send(rentals);
});

module.exports = router;