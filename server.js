const port = 3000;
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user');

const app = express()
dotenv.config();

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) {
        console.log(err);
    } else {
        console.log("INFO: connected to persistence layer.....");
    }
});

app.post('/', (req, res) => {
    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save(err => {
        if (err) {
            res.json(err);
        } else {
            res.json("successfully saved!");
        }

    });

});

app.get('/', (req, res) => {
    res.json({"location": "London", "version": "0.1.0"});
});

app.listen(port, err => {
    if (err) {
        console.log(err);
    } else {
        console.log(`App running on http://localhost:${port}`);
    }
});