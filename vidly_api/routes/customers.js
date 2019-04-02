const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Joi = require('joi');
const router = express.Router();

const customerSchema = new mongoose.Schema({
    isGold: {
       type: Boolean,
       required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true
    }
});

const Customer = mongoose.model('Customer', customerSchema);

const validateCustomer = (customer) => {
    const schema = Joi.object().keys({
        isGold: Joi.boolean().required(),
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().required()
    });

    return Joi.validate(customer, schema);
};

router.get("/", async (req, res) => {
    const customers = await Customer.find().sort({ name: 1 });
    res.send(customers);
});

router.post("/", async (req, res) => {
    const {errors} = validateCustomer(req.body);
    if (errors) res.status(400).send(errors);

    const customer = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    });

    const result = await customer.save();
    res.send(result);
})

module.exports = router;

