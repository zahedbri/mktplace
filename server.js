const port = 3000;
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

app.post('/', (req, res) => {
    console.log(req.body);
    console.log(req.body.name);
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