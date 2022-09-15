const UserSchema = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRegister = async (req, res) => {
    try {   
        let { 
            firstname,
            lastname,
            username,
            userhandle,
            email, 
            password,
            profilepicture,
            bio,
        } = req.body;

        if (!email || !password)
            return res.status(400).json({
                Message: 'Password and email are required'
            })
        if (password.length < 8)
            return res
                .status(400)
                .json({
                    Message: 'Password should be at least 8 characters long'
                })
        //check the db if email already exist
        const userEmail = await UserSchema.findOne({ email }) 
                if(userEmail) return res.status(400).json({
                    Message: 'User already exists'
                })
        //check the db if username already exist
        const userName = await UserSchema.findOne({ username })
                if(userName) return res.status(400).json({
                    Message: 'Username already exists'
                })
        //check the db if userhandle already exist
        const userHandle = await UserSchema.findOne({ userhandle })
                if(userHandle) return res.status(400).json({
                    Message: 'User handle already exists'
                })

        const newUser = new UserSchema({
            firstname,
            lastname,
            username,
            userhandle,
            email, 
            password,
            profilepicture,
            bio,
        })
        bcrypt.hash(password, 7, async(err, hash) => {
            if(err)
            return res.status(400).json({
                Message: 'Error while saving the password'
            })
            newUser.password = hash
            const savedUserRes = await newUser.save()

            if (savedUserRes)
            return res.status(200).json({
                Message: 'User saved successfully'
            })
        })
    } catch (err) {
        res.status(400).json({
            error: true,
            success: false,
            message: "Something went wrong" + err,
        });
    }
};

module.exports = handleRegister;