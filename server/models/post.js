require('dotenv').config();
const mongoose = require("mongoose");

const postDB = mongoose.createConnection(process.env.DATABASE_URL + `BookFace`);
const Posts = postDB.model(
    "Posts",
    new mongoose.Schema({
        title: {
            type: String,
            required: true,
            trim: true,
        },
        text: {
            type: String,
            required: true,
        },
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User '},
        comments_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        },
        hidden: Boolean,
    }, {
        collection: 'post',
        timestamps: true
    })
);

module.exports = Posts;