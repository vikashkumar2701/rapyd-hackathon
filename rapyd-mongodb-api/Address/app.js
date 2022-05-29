require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.json());

app.use(express.urlencoded());

app.use(cors());

const address = {
    id : String
}

const customer = new mongoose.Schema({
    name: String,
    email: String,
    number : String,
    address: [address],
    customer_id : String
});

const Customer = mongoose.model('Customer', customer);

app.get("/", (req, res) => {
    res.send("Rapyd API V2");
});


app.post("/save/customer", (req, res) => {
    
    if(req.body.name===undefined || req.body.email===undefined || req.body.number===undefined || req.body.customer_id===undefined){
        res.status(204).send("Please fill all the fields");
        return;
    }

    const cust = new Customer({
        name: req.body.name,
        email: req.body.email,
        number : req.body.number,
        customer_id : req.body.customer_id
    });

    Customer.findOne({customer_id: req.body.customer_id}, (err, customer) => {
        if(err){
            res.status(500).send("Error in finding the customer");
        }
        if(customer){
            res.status(302).send("Customer already exists");
        }
        else{
            cust.save((err, customer) => {
                if(err){
                    res.status(500).send("Error in saving the customer");
                    return;
                }
                const sending = {
                    customer_id : customer.customer_id,
                }
                res.status(200).json(sending);
            }
            );
        }
    });
});

app.post("/check/customer", (req, res) => {
    if(req.body.number===undefined || req.body.country_code===undefined){
        res.status(204).send("Please fill all the fields");
        return;
    }
    const number = "+"+req.body.country_code+req.body.number;
    Customer.findOne({number: number}, (err, customer) => {
        if(err){
            res.status(500).send("Error in finding the customer");
        }
        if(customer){
            const sending = {
                "status" : "true",
                "customer_id" : customer.customer_id
            }
            res.status(200).json(sending);
        }
        else{
            const sending = {
                "status" : "false"
            }
            res.status(200).json(sending);
        }
    }
    );
});

app.get("/get/customer/:customer_id", (req, res) => {
    if(req.params.customer_id===undefined){
        res.status(204).send("Please fill all the fields");
        return;
    }
    Customer.findOne({customer_id: req.params.customer_id}, (err, customer) => {
        if(err){
            res.status(500).send("Error in finding the customer");
        }
        if(customer){
            res.status(200).send(customer);
        }
        else{
            res.status(404).send("Customer not found");
        }
    });
});

app.post("/save/address",(req, res) => {
    if(req.body.customer_id===undefined || req.body.address_id===undefined){
        res.status(204).send("Please fill all the fields");
        return;
    }
    Customer.findOne({customer_id: req.body.customer_id}, (err, customer) => {
        if(err){
            res.status(500).send("Error in finding the customer");
        }
        if(customer){
            Customer.findOne({customer_id: req.body.customer_id,address:{$elemMatch:{id: req.body.address_id}}}, (err, address) => {
                if(err){
                    res.status(500).send("Error in finding the address");
                }
                if(address){
                    res.status(302).send("Address already exists");
                }
                else{
            customer.address.push({id: req.body.address_id});
            customer.save((err, customer) => {
                if(err){
                    res.status(500).send("Error in saving the customer");
                }
                res.status(201).send("Address saved successfully");
            }
            );

        }});
        }
        else{
            res.status(404).send("Customer not found");
        }
    });
})

app.get("/checkif/address/:customer_id" , (req, res) => {
    if(req.params.customer_id===undefined){
        res.status(204).send("Please fill all the fields");
        return;
    }
    Customer.findOne({customer_id: req.params.customer_id}, (err, customer) => {
        if(err){
            res.status(500).send("Error in finding the customer");
        }
        if(customer){
            if(customer.address.length===0){
                const sending = {
                    "status" : "false"
                }
                res.status(200).json(sending);
            }
            else{
                const sending = {
                    "status" : "true",
                    "data" : customer.address
                }
                res.status(200).json(sending);
            }
        }
        else{
            res.status(200).send("Customer not found");
        }
    }
    );
});


app.get("/customer/:customer_id/address", (req, res) => {
    if(req.params.customer_id===undefined){
        res.status(204).send("Please fill all the fields");
        return;
    }
    Customer.findOne({customer_id: req.params.customer_id}, (err, customer) => {
        if(err){
            res.status(500).send("Error in finding the customer");
        }
        if(customer){
            if(customer.address.length===0){
                res.status(404).send("Address not found");
                return;
            }
            res.status(200).json(customer.address);
        }
        else{
            res.status(404).send("Customer not found");
        }
    }
    );
});


app.get("/customerid/:cust_id/deleteaddr/:addr_id", (req, res) => {
    if(req.params.cust_id===undefined || req.params.addr_id===undefined){
        res.status(204).send("Please fill all the fields");
        return;
    }
    Customer.findOne({customer_id: req.params.cust_id}, (err, customer) => {
        if(err){
            res.status(500).send("Error in finding the customer");
        }
        if(customer){
            Customer.findOne({customer_id: req.params.cust_id,address:{$elemMatch:{_id: req.params.addr_id}}}, (err, address) => {
                if(err){
                    res.status(500).send("Error in finding the address");
                }
                if(address){
                    Customer.findOneAndUpdate({customer_id: req.params.cust_id}, {$pull: {address: {id: req.params.addr_id}}}, (err, customer) => {
                        if(err){
                            res.status(500).send("Error in deleting the address");
                        }
                        res.status(200).send("Address deleted successfully");
                    }
                    );
                }


                else{
                    res.status(200).send("Address not found");
                }
            }
            );
        }
        else{
            res.status(200).send("Customer not found");
        }
    }
    );
});
    


app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});