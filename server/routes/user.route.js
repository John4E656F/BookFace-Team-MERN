const router = require('express').Router();
const bcrypt = require('bcrypt');

const handleLogin = require('../controllers/user.login');
const handleRegister = require('../controllers/user.register');

const User = require('../models/user');

router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error', + err));
});

router.route('/login').post(handleLogin);
router.route('/register').post(handleRegister);

// cleaning the cookies from the user session
router.delete('/logout', async(req, res) => {
    require.session.destroy((error) => {
        if(error) throw error

        res.clearCookie('session-id')
        res.status(200).send("Logout Success")
    })
})

router.get('/isAuth', async (req, res) => {
    if(req.session.user) {
        return res.json(req.session.user)
    } else {
        return require.status(401).json('Unauthorize')
    }
})

// router.route('/register').post((req, res) => {
//     const firstname = req.body.firstname;
//     const lastname = req.body.lastname;
//     const username = req.body.username;
//     const userhandle = req.body.userhandle;
//     const email = req.body.email;
//     const password = bcrypt.hashSync(req.body.password, 20); 
//     const profilepicture = req.body.profilepicture;
//     const bio = req.body.bio;
    
//     const newUser = new User({
//         firstname,
//         lastname,
//         username,
//         userhandle,
//         email,
//         password,
//         email,
//         profilepicture,
//         bio,
//     });
//     newUser.save()
//     .then(() => res.json('User added!'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

router.route('/:user_id')
    .get((req, res) => {
        User.findById(req.params.user_id, (err, user) => {
            if(err) res.send(err);
            res.json(user);
        })
    })
    .put((req, res) => {
        User.findById(req.params.user_id, (err, user) => {
            if(err) res.send(err);

            if(req.body.firstname) user.firstname = req.body.firstname;
            if(req.body.lastname) user.lastname = req.body.lastname;
            if(req.body.username) user.username = req.body.username;
            if(req.body.userhandle) user.userhandle = req.body.userhande;
            if(req.body.email) user.email = req.body.email;
            if(req.body.password) user.password = req.body.password;
            if(req.body.bio) user.bio = req.body.bio;

            user.save((err) => {
                if(err) RegExp.send(err);
                res.json({message : 'User has been updated!' , data : user});
            })
        })
    })
    .delete((req, res )=> {
        User.remove({
            _id: req.params.user_id
        }, (err , user) => {
            if(err, user) res.send(err)
            res.sjon({ message: 'Succesfully deleted user' });
        })
    })

module.exports = router;