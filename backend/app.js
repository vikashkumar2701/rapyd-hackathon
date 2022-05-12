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

app.get("/checkifexist/:countrycode/number/:phonenumber", async (req, res) => {

    let countrycode = req.params.countrycode;
    let phonenumber = req.params.phonenumber;
    // console.log(countrycode);
    // console.log(phonenumber);
    axios.get('https://rapyduser.herokuapp.com/checkif/'+countrycode+'/number/'+phonenumber).then(function(response){
      
        res.sendStatus(200);

        }).catch(function(error){
            res.sendStatus(404);
    }
    );

});

app.get("/sendotp/:countrycode/number/:phonenumber", async(req, res) => {
    
        let countrycode = req.params.countrycode;
        let phonenumber = req.params.phonenumber;
        
        // console.log(countrycode);
        // console.log(phonenumber);
        salt = await bcrypt.genSalt(6);
        const otp = Math.floor(Math.random() * 1000000).toString();
        console.log(otp);
        const encryptedotp = await bcrypt.hash(otp, salt);
        const token = jwt.sign({
            "otp": encryptedotp,
            "countrycode": countrycode,
            "phonenumber": phonenumber


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

    let countrycode = body.countrycode;
    let phonenumber = body.phonenumber;
    let token = accesskey;
    try{
    const decoded = jwt.verify(token, 'secret');
    
    console.log(decoded);
    
    // const userotp = await bcrypt.hash(otp, salt);
    const checkotp = await bcrypt.compare(otp, decoded.otp);
    const getaddress = await axios.get(`https://rapyduser.herokuapp.com/getAddress/${decoded.countrycode}/phone/${decoded.phonenumber}`);
    console.log(getaddress.data);
    if(checkotp){
        
        const response = {

            "status": "true",
            "message": "OTP verified",
            "address": getaddress.data[0].address

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
