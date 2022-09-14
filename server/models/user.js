require('dotenv').config();
const mongoose = require('mongoose');

const userDB = mongoose.createConnection(process.env.DATABASE_URL + `BookFace`)
const Users = userDB.model(
    "Users",
    new mongoose.Schema({
        firstname: {
            type: String,
            required: false,
            trim: true,
            match: [/^[a-zA-Z]+$/, 'is invalid'],
        },
        lastname: {
            type: String,
            required: false,
            trim: true,
            match: [/^[a-zA-Z]+$/, 'is invalid'],
        },
        username: {
            type: String,
            required: [true, "can't be empty"],
            match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
            trim: true,
            unique: true,
            min: 3,
            max: 20,
        },
        userhandle: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        profilepicture: {
            type: String,
        },
        bio: String,
        // role: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Role',
        //     default: 'Basic',
        // },
        // timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
        hidden: {
            type: Boolean,
            default: false,
        },
    }, { 
        collection: 'users',
        timestamps: true,
        })
);

module.exports = Users;