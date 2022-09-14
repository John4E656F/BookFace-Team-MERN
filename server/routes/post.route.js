const router = require('express').Router();

let Post = require('../models/post');

router.get('/', (req, res) => {
    Post.find()
    .then(post => res.json(post))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.post('/submit', (req, res) => {
    const newPost = new Post({ ...req.body })

    newPost.save()
    .then(result => res.status(200).json('Post Added! ' + result))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:post_id')
    .get((req, res) => {
        Post.findById(req.params.post_id, (err, post) => {
            if(err) res.send(err);

            res.json(post);
        })
    })

    .put((req, res) => {
        Post.findById(req.params.post_id, (err, post) => {
            if(err) res.send(err);
            if(req.body) post.body = { ...req.body };
            post.save((err) => {
                res.json({message: 'Post has been updated!', data: post});
            });
        })
    })
    .delete((req, res) => {
        Post.remove({
            _id: req.params.post_id
        }, (err, user) => {
            if(err) res.send(err);
            res.json({ message: 'Successfully deleted post' });
        })
    })

module.exports = router;