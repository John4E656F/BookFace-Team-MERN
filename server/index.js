require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

//connect to database
mongoose.connect(mongoString);

//print error
database.on('err', (err) => {
    console.log(err)
})

//print success
database.once('connected', () => {
    console.log('Database Connected');
})

//initialize express
const app = express();
//use cors
app.use(cors());
//use json
app.use(express.json());

const userRoute = require('link to user route');

app.use('/user', userRoute);

const PORT = process.env.PORTapp.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})