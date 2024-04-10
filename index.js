const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();

//load the .env variables

//TODO: add cors
app.use(cors());
app.use(bodyParser.json());

//import the routes
const pokemonRouter = require('./routes/pokemon');

//route mapping
app.use('/api', pokemonRouter);





//start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});