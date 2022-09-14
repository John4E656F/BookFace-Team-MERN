require('dotenv').config();
const mongoose = require("mongoose");

const commentDB = mongoose.createConnection(process.env.DATABASE_URL + `BookFace`)
const Comments = commentDB.model(
    "Comments", 
    new mongoose.Schema({
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            trim: true,
        },
        post_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true,
            trim: true,
        },
        text: {
            type: String,
            required: true,
            trim: true,
        },
       hidden: Boolean,
    }, { 
        collection: 'comment',
        timestamps: true,
        })
);

module.exports = Comments;