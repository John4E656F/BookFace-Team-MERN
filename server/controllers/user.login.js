const UserSchema = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLogin = async (req, res) => {
    try  {
        let { email, password } = req.body

        if (!email || !password ) {
            res.status(400).json({
                Message: 'Something is missing'
            })
        }

        //find email in the db
        const user = await UserSchema.findOne({ email: email })
        if (!user) {
            return res.status(400).json({
                error:true,
                Message: "Sorry, we can't find an account with this email address. Please try again"
            });
        }

        const matchPassword = await
        bcrypt.compare(password, user.password)
        if (matchPassword) {
            // const accessToken = jwt.sign({ data: user._id }, process.env.JWT_KEY, {
            //    expiresIn: "360000s",
            // });
            // creating user session to keep user loggedin also on refresh
            const userSession = { email: user.email }
            // attach user session to session object from express-session
            req.session.user = userSession

            return res.status(200).json({ Message: 'You have logged in successfully', userSession })
        } else {
            return res.status(400).json({
                Message: 'Invalid credential'
            })
        }
    } catch (err) {
        res.status(400).json({
            error: true,
            success: false,
            message: "Something went wrong" + err,
        });
    }
};

module.exports = handleLogin;