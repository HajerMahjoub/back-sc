require('dotenv').config()

import scrapperProductCtrl from './controllers/scrapperProductCtrl';
import getAllProductsCtrl from './controllers/getAllProductsCtrl'
import getProductCtrl from './controllers/getProductCtrl'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/scrapper'

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();
 
app.use(bodyParser.json())
app.use(cors())

app.get('/', (request, response) => {
  response.send('Hello world!');
});
 

app.post('/products', scrapperProductCtrl)

app.post('/products/related', getAllProductsCtrl)

app.get('/products/:id', getProductCtrl)

app.listen(3000);