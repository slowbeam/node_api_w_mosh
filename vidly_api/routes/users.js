const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const {User, validate} = require('../models/user');

// Register a new user
router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) res.status(400).send(error);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('A user with this email address already exists.');

    user = new User (_.pick(req.body, ["name", "email", "password"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

// Get the current user
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

module.exports = router;