const express = require('express');
const router = express.Router();

const Customer = require('../models/customersModel');
const customerController = require('../controllers/customersController');

//router params
router.param('id', async (req, res, next, id) => {
    try {
        const customer = await Customer.findById(id);
        if(customer) {
            req.customerId = id;
            next();
        } 
    } catch (error) {
        console.log(error.message);
        res.status(404).send("Customer not found");
    }
});

//get all customers
router.get('/', customerController.fetchAllCustomers);

//get a specific customer
router.get('/:id', customerController.getCustomer); 

//update a customer
router.put('/:id', customerController.updateCustomer);

//create a customer
router.post('/', customerController.createCustomer);

//delete a customer
router.delete('/:id', customerController.deleteCustomer);

//export 
module.exports = router;