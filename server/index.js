require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

//connect to database
mongoose.connect(mongoString);
const database = mongoose.connection;
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

const userRoute = require('./routes/user.route');
const postRoute = require('./routes/post.route');
const commentRoute = require('./routes/comment.route');

app.use('/user', userRoute);
app.use('/post', postRoute);
app.use('/comment', commentRoute);

const PORT = process.env.PORT
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })