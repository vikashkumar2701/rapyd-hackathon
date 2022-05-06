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

const express = require('express');
var cors = require('cors');
const makeRequest = require('./utilities').makeRequest;

var app = express();

app.set('json spaces', 4);
const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));
app.listen(3000);

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

