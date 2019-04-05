const express = require('express');
const router = express.Router();
const {Customer, validate} = require('../models/customer');
const auth = require('../middleware/auth');

router.get("/", async (req, res) => {
    const customers = await Customer.find().sort({ name: 1 });
    res.send(customers);
});

router.post("/", auth, async (req, res) => {
    const {errors} = validate(req.body);
    if (errors) res.status(400).send(errors);

    let customer = new Customer({  
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });

    customer = await customer.save();
    res.send(customer);
});

router.put("/:id", auth, async (req, res) => {
    const { errors } = validate(req.body);
    if (errors) return res.status(400).send(errors);

    const customer = await Customer.findById(req.params.id);

    if (!customer) res.status(404).send("The customer with the provided ID was not found.");

    customer.isGold = req.body.isGold || customer.isGold;
    customer.name = req.body.name || customer.name;
    customer.phone = req.body.phone || customer.phone;

    const result = await customer.save();
    res.send(result);
});

router.delete("/:id", auth, async (req, res) => {
    const customer = await Customer.findOneAndDelete({ _id: req.params.id });
    if (!customer) res.status(404).send("The customer with the provided ID was not found.");
    res.send(customer);
});

module.exports = router;

