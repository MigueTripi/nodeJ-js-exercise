import express from 'express';
import Routes from './routes';
import mongoose from 'mongoose';
import logger from 'morgan';
import bodyParser from 'body-parser';

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
Routes.configure(app);


const start = async () => {
    await mongoose.connect('mongodb://localhost');
    
    app.listen(3000, ()=> {
        console.log("Server is listering");
    });
}

start();