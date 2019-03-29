const Question = require('../models/question');
const Answer = require('../models/answer');
const User = require('../models/user');
const mongoose = require('mongoose');

class QuestionController {
  static list(req, res) {
    Question
      .find({})
      .populate('answers user')
      .exec((err, docs) => {
        if(err) {
          res.status(500).json(err);
        } else {
          User.populate(docs, {
            path: 'answers.user',
            Model: Answer,
          }, (err, docs) => {
            if(err) {
              res.status(500).json(err);
            } else {
              res.status(200).json(docs);
            }
          });
        }
      });
  }

  static getOne(req, res) {
    Question
      .findById(req.params.id)
      .populate('answers user')
      .exec((err, docs) => {
        if(err) {
          res.status(500).json(err);
        } else {
          User.populate(docs, {
            path: 'answers.user',
            Model: Answer,
          }, (err, docs) => {
            if(err) {
              res.status(500).json(err);
            } else {
              res.status(200).json(docs);
            }
          });
        }
      });
  }

  static post(req, res) {
    req.body.user = req.user;
    Question
      .findOneAndUpdate({
        _id: mongoose.Types.ObjectId(),
      } , {
        ...req.body
      }, {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      })
      .populate('answers user')
      .exec((err, doc) => {
        if(err) {
          res.status(500).json(err);
        } else {
          User.populate(doc, {
            path: 'answers.user',
            Model: Answer,
          }, (err, doc) => {
            if(err) {
              res.status(500).json(err);
            } else {
              res.status(201).json(doc);
            }
          });
        }
      });
      
  }

  static myList(req, res) {
    const user = req.user
    Question
      .find({
        user,
      })
      .populate('answers user')
      .then(questions => {
        res.status(200).json(questions);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }

  static edit(req, res) {
    Question
      .findOneAndUpdate({
        _id: req.params.id,
      }, {
        ...req.body,
      }, {
        runValidators: true,
        new: true,
      })
      .populate('answers user')
      .exec((err, docs) => {
        if(err) {
          res.status(500).json(err);
        } else {
          User.populate(docs, {
            path: 'answers.user',
            Model: Answer,
          }, (err, docs) => {
            if(err) {
              res.status(500).json(err);
            } else {
              res.status(200).json(docs);
            }
          });
        }
      });
  }

  static addAnswer(req, res) {
    Question
      .findOneAndUpdate({
        _id: req.params.id,
      }, {
        $push: {
          answers: req.body.answer
        }
      }, {
        new: true,
      })
      .populate('answers user')
      .exec((err, docs) => {
        if(err) {
          res.status(500).json(err);
        } else {
          User.populate(docs, {
            path: 'answers.user',
            Model: Answer,
          }, (err, docs) => {
            if(err) {
              res.status(500).json(err);
            } else {
              res.status(200).json(docs);
            }
          });
        }
      });
  }

  static vote(req, res) {
    Question
      .findById(req.params.id)
      .populate('answers user')
      .exec((err, docs) => {
        if(err) {
          res.status(500).json(err);
        } else {
          User.populate(docs, {
            path: 'answers.user',
            Model: Answer,
          }, (err, docs) => {
            if(err) {
              res.status(500).json(err);
            } else {
              if(req.body.vote === 'upvote') {
                if(docs.downvotes.indexOf(req.user) > -1) {
                  docs.downvotes.splice(docs.downvotes.indexOf(req.user), 1);
                }
                if(docs.upvotes.indexOf(req.user) > -1) {
                  docs.upvotes.splice(docs.upvotes.indexOf(req.user), 1);
                } else {
                  docs.upvotes.push(req.user);
                }
              }
              if(req.body.vote === 'downvote') {
                if(docs.upvotes.indexOf(req.user) > -1) {
                  docs.upvotes.splice(docs.upvotes.indexOf(req.user), 1);
                }
                if(docs.downvotes.indexOf(req.user) > -1) {
                  docs.downvotes.splice(docs.downvotes.indexOf(req.user), 1);
                } else {
                  docs.downvotes.push(req.user);
                }
              }
              docs.save(err => {
                if(err) {
                  res.status(500).json(err);
                } else {
                  res.status(200).json(docs);
                }
              });
            }
          });
        }
      });
  }

  static delete(req, res) {
    Question
      .findOneAndDelete({
        _id: req.params.id,
      })
      .then(question => {
        return Answer
          .deleteMany({
            question: question._id,
          });
      })
      .then(() => {
        res.status(200).json({
          message: 'Successfully deleted question'
        })
      })
      .catch(err => {
        res.status(500).json(err);
      })
  }
}

module.exports = QuestionController;
