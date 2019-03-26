const express = require('express');
const router = express.Router();
const Answer = require('../controllers/answer');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorizeAnswer');
const authorizeAcceptedAnswer = require('../middlewares/authorizeAcceptedAnswer');
const hasVotedAnswer = require('../middlewares/hasVotedAnswer');

router.get('/:questionId', Answer.list);

router.use(authenticate);

router.post('/', Answer.post);

router.get('/mylist', Answer.myList);

router.put('/:id', authorize, Answer.edit);

router.put('/:id/upvote', hasVotedAnswer, Answer.upvote);

router.put('/:id/downvote', hasVotedAnswer, Answer.downvote);

router.put('/:id/cancelUpvote', Answer.cancelUpvote);

router.put('/:id/cancelDownvote', Answer.cancelDownvote);

router.put('/:id/accept', authorizeAcceptedAnswer, Answer.accept);

module.exports = router;
