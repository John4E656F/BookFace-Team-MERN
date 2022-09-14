require('dotenv').config();
const mongoose = require('mongoose');

const userDB = mongoose.createConnection(process.env.DATABASE_URL + `user`)
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
        userhandler: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        email: {
            trpe: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        profilePicture: {
            type: Array,
            required: true,
        },
        bio: String,
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role',
            default: 'Basic',
        },
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
        hidden: {
            type: Boolean,
            default: false,
        },
    }, { collection: 'users' })
);

module.exports = Users;