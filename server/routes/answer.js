const express = require('express');
const router = express.Router();
const Answer = require('../controllers/answer');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorizeAnswer');
const authorizeAcceptedAnswer = require('../middlewares/authorizeAcceptedAnswer');

router.get('/', Answer.list);

router.use(authenticate);

router.post('/', Answer.post);

router.get('/mylist', Answer.myList);

router.get('/:id', Answer.getOne);

router.put('/:id', authorize, Answer.edit);

router.put('/:id/vote', Answer.vote);

router.put('/:id/accept', authorizeAcceptedAnswer, Answer.accept);

module.exports = router;
