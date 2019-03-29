const express = require('express');
const router = express.Router();
const Question = require('../controllers/question');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorizeQuestion');

router.get('/', Question.list);

router.post('/', authenticate, Question.post);

router.get('/mylist', authenticate, Question.myList);

router.get('/:id', Question.getOne);

router.use(authenticate);

router.put('/:id', authorize, Question.edit);

router.put('/:id/addAnswer', Question.addAnswer);

router.put('/:id/vote', Question.vote);

router.delete('/:id', authorize, Question.delete);

module.exports = router;
