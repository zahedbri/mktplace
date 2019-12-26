const port = 3000;
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user');

const app = express();
dotenv.config();

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

const productRoute = require('./routes/product');
const categoryRoute = require('./routes/category');
const ownerRoute = require('./routes/owner');

app.use("/api", productRoute);
app.use("/api", categoryRoute);
app.use("/api", ownerRoute);

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

app.listen(port, err => {
    if (err) {
        console.log(err);
    } else {
        console.log(`App running on http://localhost:${port}`);
    }
});