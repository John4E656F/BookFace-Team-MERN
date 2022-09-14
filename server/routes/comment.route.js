const router = require('express').Router();

let Comment = require('../models/comment');

router.get('/', (req, res) => {
    Comment.find()
    .then(comment => res.json(comment))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.post('/submit', (req, res) => {
    const newComment = new Comment({ ...req.body })

    newComment.save()
    .then(result => res.status(200).json('Comment Added!' + result))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:comment_id')
    .get((req, res) => {
        Comment.findById(req.params.comment_id, (err, comment) => {
            if(err) res.send(err);
            res.json(comment);
        })
    })
    .put((req, res) => {
        Comment.findById(req.params.comment_id, (err, comment) => {
            if(err) res.send(err);
            if(req.body) comment.body = {...req.body};

            comment.save((err) => {
                if(err) res.send(err);

                res.json({message: 'Comment has been updated!', data: comment});
            });
        })
    })
    .delete((req, res) => {
        Comment.remove({
            _id: req.params.post_id
        }, (err, comment) => {
            if(err) res.send(err);
            res.json({ message: 'Successfully deleted comment'});
        })
    })


module.exports = router;