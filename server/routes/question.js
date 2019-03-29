const express = require('express');
const router = express.Router();
const Question = require('../controllers/question');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorizeQuestion');

router.get('/', Question.list);

router.use(authenticate);

router.post('/', Question.post);

router.get('/mylist', Question.myList);

router.put('/:id', authorize, Question.edit);

router.put('/:id/addAnswer', Question.addAnswer);

router.put('/:id/vote', Question.vote);

router.delete('/:id', authorize, Question.delete);

module.exports = router;
