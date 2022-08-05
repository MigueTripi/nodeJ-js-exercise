const express = require('express');
const Routes = require('./routes');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
app.use(logger());
app.use(bodyParser.json());
Routes.configure(app);


const start = async () => {
    await mongoose.connect('mongodb://localhost');
    
    app.listen(3000, ()=> {
        console.log("Server is listering");
    });
}

start();