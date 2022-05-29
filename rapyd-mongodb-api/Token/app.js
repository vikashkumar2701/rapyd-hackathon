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

const secret = new mongoose.Schema({
    token : String,
});

const Secret = mongoose.model('Secret', secret);

app.get("/", (req, res) => {
    res.send("Token Generator");
});

app.post("/save/session", (req, res) => {
    if(req.body.token === undefined) {
        res.json({
            status : 200 ,
            message : "Token is required"
        });
        return ;
    }
    const secret = new Secret({
        token : req.body.token,
    });
    secret.save((err, data) => {
        if(err) {
            res.json({
                status : 200 ,
                message : "Error"
            });
            return ;
        }
        res.json({
            status : 200 ,
            id : data._id,
        });
    });
    
});

app.get("/logout/:id", (req, res) => {
    Secret.findByIdAndDelete(req.params.id, (err, data) => {
        if(err) {
            res.json({
                status : 200 ,
                message : "ID not found"
            });
            return ;
        }
        if(data === null) {
            res.json({
                status : 200 ,
                message : "ID not found"
            });
            return ;
        }
        res.json({
            status : 200 ,
            message : true
        });
    });
})


app.get("/checksession/:id", (req, res) => {
    Secret.findById(req.params.id, (err, data) => {
        if(err) {
            res.json({
                status : 404 ,
                message : "ID not found"
            });
            return ;
        }
        if(data === null) {
            res.json({
                status : 404 ,
                message : "ID not found"
            });
            return ;
        }
        res.json({
            status : 200 ,
            token : data.token,
        });
    });
})
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});