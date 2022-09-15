require('dotenv').config();
const session = require('express-session')
const cors = require('cors');
const MongoDBStore = require('connect-mongodb-session')(session) // add this package to store the user session id automatically on mongodb
// check on your db, you will have another collection (next to people) which is 'mySessions'
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

//initialize express
const app = express();
const MAX_AGE = 1000 * 60 * 60 * 3 // 3hrs

const corsOptions = {
    origin: 'http://localhost:3000',
    optionSuccessStatus: 200, //Some legacy browser (IE11, various SmartTVs) choke on 204
    credentials: true
}
//This is where your API is making its initial connection to the database
mongoose.Promise = global.Promise
mongoose.connect(mongoString, {
    useNewUrlParser: true,
});
const database = mongoose.connection;
//print error
database.on('err', (err) => {
    console.log(err)
})

//print success
database.once('connected', () => {
    console.log('Database Connected');
})

// setting up connect-mongodb-session store
const mongoDBstore = new MongoDBStore({
    uri: mongoString+ 'BookFace',
    collection: 'userSessions',
  })
app.use(
    session({
        secret: 'a1s2d3f4g5h6',
        name: 'session-id', // cookies name to be put in "key" field in postman
        store: mongoDBstore,
        cookie: {
          maxAge: MAX_AGE, // this is when our cookies will expired and the session will not be valid anymore (user will be log out)
          sameSite: false,
          secure: false, // to turn on just in production
        },
        resave: true,
        saveUninitialized: false,
      })
    )


//use cors
app.use(cors(corsOptions));
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