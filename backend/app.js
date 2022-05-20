/**
 * Rapyd Integrations: Request Signature.
 *
 * This app implements the Rapyd's API request signature. The crypto-js library
 * is required (https://www.npmjs.com/package/crypto-js). To install it, run:
 * 
 * npm install crypto-js
 *
 * @link   https://docs.rapyd.net/
 * @file   This files defines the main node.js application.
 * @author Isaac Benitez.
 * @version 0.0.1
 * 
 * @requires express
 * @requires https
 * @requires crypto-js
 */
 const https = require('https');
const express = require('express');
var jwt = require('jsonwebtoken');
var cors = require('cors');
const makeRequest = require('./utilities').makeRequest;
let bodyParser=require('body-parser');
const bcrypt = require('bcrypt');
var axios = require('axios');

var app = express();
app.use(bodyParser.json())
app.set('json spaces', 4);
const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));
app.listen(3000);
var salt = "";
app.get('/FetchPaymentMethods/:countryname', async (req, res) => {

    var countryname = req.params.countryname;
    console.log(countryname);
    try {
        const result = await makeRequest('GET', '/v1/payment_methods/country?country='+countryname);
    
        res.json(result);
      } catch (error) {
        res.json(error);
      }

})

app.get('/payment', async (req, res) => {

    try {
        const body = {
            amount: 230,
            currency: 'EUR',
            payment_method: {
                type: 'it_psc_cash'
            }
        };
        const result = await makeRequest('POST', '/v1/payments', body);
        res.json(result);
    } catch (error) {
        res.json(error);
    }

})

app.get('/countries', async (req, res) => {
    
    console.log("fetching countries");
    try {   
        const result = await makeRequest('GET', '/v1/data/countries');
        res.json(result);
    } catch (error) {
        res.json(error);
    }

})


app.get('/requiredfields/:payment_id', async (req, res) => {
    var payment_id = req.params.payment_id;
    console.log(payment_id);
    try {
        const result = await makeRequest('GET', '/v1/payment_methods/required_fields/'+payment_id);
        // Message body absent/'+payment_id);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
});

app.post('/checkout', async (req, res) => {
    
    let body = req.body;
    console.log(body);
    try{

        const result = await makeRequest('POST', '/v1/checkout', body);
        res.json(result);
    }
    catch(error){
        res.json(error);
    }


});

app.get("/checkout/:checkoutid", async (req, res) => {
    let checkoutid = req.params.checkoutid;
    console.log(checkoutid);
    try {
        const result = await makeRequest('GET', '/v1/checkout/'+checkoutid);
       
        console.log(result);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

app.post("/create/customer", async (req, res) => {
    let body = req.body;
    console.log(body);
    try {
        const result = await makeRequest('POST', '/v1/customers', body);
        
        res.json(result);

    } catch (error) {
        res.json(error);
    }
   
});


//Arghyadeep Task -> Create a API to store specific data  {number, email, name, customer_id} in the database by using POST method. I will be sending everything in the body.;

//SYNTAX: app.post("/save/customer", async (req, res) => {} use this syntax to create a new customer in the database.

//Arghyadeep Task -> Check whether the customer id is present or not for that specific phone number.

//SYNTAX: app.get("/check/customer/:number", async (req, res) => {  use this syntax to check whether the customer id is present or not for that specific phone number.

//Arghyadeep Task -> If the customer id is present then return the customer id.

//SYNTAX: app.get("/get/customer/:number", async (req, res) => {  use this syntax to fetch the customer id for that specific phone number.




// Arghyadeep Task -> Create a API to store {customer_id, addresses_id } where the address can be several for the same customer id.

// SYNTAX: app.post("/save/address", async (req, res) => { use this syntax to save the address for the customer.

// I will be sending customer_id and address_id in the body manage no duplication for that customer_id. 

// Arghyadeep Task -> Create a API to check if the address is present or not for that specific customer_id. return type 200 or 404

// SYNTAX: app.get("/checkif/address/:customer_id", async (req, res) => { use this syntax to check whether the address is present or not for that specific customer_id.

// Arghyadeep Task -> Create a API to display array of addresses for that specific customer_id {request type "GET" and url "/customer/:customer_id/addresses"}

// SYNTAX: app.get("/customer/:customer_id/addresses", async (req, res) => { use this syntax to display array of addresses for that specific customer_id.




app.get("/checkifexist/:customer_id", async (req, res) => {

    let customer_id = req.params.customer_id;

    await axios.get('https://rapidapiv2.herokuapp.com/checkif/address/'+customer_id).then(function(response){
      console.log(response.data.data);

      if(response.data.data.length>=1){
        const resp = {
            status: 200
        }
        res.status(200).send(resp);
      }

      else{

        const resp = {
            status:404
        }
        res.status(200).send(resp);
      }
   

      }).catch(function(error){
            const resp = {
                status: 405,
            }
            res.status(200).send(resp);
    });

});

app.get("/sendotp/:countrycode/number/:phonenumber/customerid/:customerid", async(req, res) => {
    
        let countrycode = req.params.countrycode;
        let phonenumber = req.params.phonenumber;
        let customerid = req.params.customerid;
        
        // console.log(countrycode);
        // console.log(phonenumber);
        salt = await bcrypt.genSalt(6);
        const otp = Math.floor(Math.random() * 1000000).toString();
        console.log(otp);
        const encryptedotp = await bcrypt.hash(otp, salt);
        const token = jwt.sign({
            "otp": encryptedotp,
            "countrycode": countrycode,
            "phonenumber": phonenumber,
            "customerid": customerid


        }, 'secret', { expiresIn: '120s' });
        // console.log(token);
        const response = {
            "token": token
        }
        res.json(response);



});

app.post("/verifyotp", async (req, res) => {
    let body = req.body;
    var accesskey = req.headers['x-access-key'];
    // console.log(accesskey);
    if(accesskey==="" ||accesskey===undefined || accesskey===null){

        const response = {

            "status": "false",
            "message": "Please provide One Time Password"

        }
        res.status(404).json(response);
    }
    else{
    // console.log(body);
    let otp = body.otp;

  
    let token = accesskey;
    try{
    const decoded = jwt.verify(token, 'secret');
    
    console.log(decoded);
    
    // const userotp = await bcrypt.hash(otp, salt);
    const checkotp = await bcrypt.compare(otp, decoded.otp);
    const getaddress = await axios.get(`https://rapidapiv2.herokuapp.com/checkif/address/${decoded.customerid}`);
    console.log(getaddress.data.data);
    if(checkotp){
        
        const response = {

            "status": "true",
            "message": "OTP verified",
            "address": getaddress.data.data

        }
        
        res.status(200).json(response);
    }
    else{
        const response = {

            "status": "false",
            "message": "OTP incorrect"

        }
        res.status(404).json(response);
    }
    
    }
    catch(error){

          const response = {

            "status": "false",
            "message": "Something went wrong."

        }
        res.status(404).json(response);
    }
}
});


app.get("/addresses/:addressid", async (req, res) => {
const addressid = req.params.addressid;
try{
const response = await makeRequest('GET', '/v1/addresses/'+addressid);
// const resp  = {
//     "status": "true",
//     "address_id": response.data.data,
// }
res.status(200).json(response.body.data);
}
catch(error){
    const resp  = {
        "status": "false"
    }
    res.status(200).send(error);
}

});


app.post("/save/address/:customerid", async (req, res) => {
    let body = req.body;
    let customerid = req.params.customerid;
    
    try{
    const response = await makeRequest('POST', '/v1/addresses', body);
    console.log(response.body.data);
    const resp  = {
        "status": "true",
        "address_id": response.body.data.id,
    }
    const savetodatabase = await axios.post('https://rapidapiv2.herokuapp.com/save/address', {
    "customer_id": customerid,
    "address_id": response.body.data.id        
    });
    console.log(savetodatabase.data);
    res.status(200).json(resp);
    }
    catch(error){
        const resp  = {
            "status": "false"
        }
        res.status(200).send(error);
    }


});


app.get("/list/coupons", async (req, res) => {

    try{
    const response = await makeRequest('GET', '/v1/coupons');
    console.log(response.body.data);
    const resp  = {
        "status": "true",
        "coupons": response.body.data.length,
    }
    res.status(200).json(resp);
    }
    catch(error){
        const resp  = {
            "status": "false",
            "coupons": 0 
        }
        res.status(200).send(error);
    }

});


app.get("/customer/:customerid/paymentmethods", async (req, res) => {
    let customerid = req.params.customerid;
    try{
    const response = await makeRequest('GET', '/v1/customers/'+customerid+'/payment_methods');
    console.log(response.body.data);
    const resp  = {
        "status": "true",
        "payment_methods": response.body.data
    }
    res.status(200).json(resp);
    }
    catch(error){
        const resp  = {
            "status": "false",
            "payment_methods": 0 
        }
        res.status(200).send(error);
    }

});
