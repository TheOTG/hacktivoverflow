const Answer = require('../models/answer');
const Question = require('../models/question');
const User = require('../models/user');

class AnswerController {
  static list(req, res) {
    Answer
      .find({})
      .populate('user question')
      .then(answers => {
        res.status(200).json(answers);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }

  static getOne(req, res) {
    Answer
      .findById(req.params.id)
      .populate('user question')
      .then(answer => {
        res.status(200).json(answer);
      })
      .catch(err => {
        res.status(500).json(err);
      })
  }

  static post(req, res) {
    req.body.user = req.user;
    Answer
      .create({
        ...req.body,
      })
      .then(answer => {
        res.status(201).json(answer);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }

  static myList(req, res) {
    const user = req.user
    Answer
      .find({
        user,
      })
      .populate('user question question.user')
      .then(answers => {
        res.status(200).json(answers);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }

  static edit(req, res) {
    Answer
      .findOneAndUpdate({
        _id: req.params.id,
      }, {
        ...req.body,
      }, {
        runValidators: true,
        new: true,
      })
      .populate('question user')
      .exec((err, doc) => {
        if(err) {
          res.status(500).json(err);
        } else {
          Answer.populate(doc, {
            path: 'question.answers',
            model: Answer,
          }, (err, doc) => {
            if(err) {
              res.status(500).json(err);
            } else {
              User.populate(doc, {
                path: 'question.answers.user',
                model: User,
              }, (err, doc) => {
                if(err) {
                  res.status(500).json(err);
                } else {
                  User.populate(doc, {
                    path: 'question.user',
                    model: User,
                  }, (err, doc) => {
                    if(err) {
                      res.status(500).json(err);
                    } else {
                      res.status(200).json(doc);
                    }
                  })
                }
              })
            }
          })
        }
      })
  }

  static vote(req, res) {
    Answer
      .findById(req.params.id)
      .populate('question user')
      .exec((err, doc) => {
        if(err) {
          res.status(500).json(err);
        } else {
          Answer.populate(doc , {
            path: 'question.answers',
            model: Answer,
          }, (err, doc) => {
            if(err) {
              res.status(500).json(err);
            } else {
              User.populate(doc, {
                path: 'question.answers.user',
                model: User,
              }, (err, doc) => {
                if(err) {
                  res.status(500).json(err);
                } else {
                  User.populate(doc , {
                    path: 'question.user',
                    model: User,
                  }, (err, doc) => {
                    if(err) {
                      res.status(500).json(err);
                    } else {
                      if(req.body.vote === 'upvote') {
                        if(doc.downvotes.indexOf(req.user) > -1) {
                          for(let i = 0; i < doc.question.answers.length; i++) {
                            if(doc.question.answers[i]._id.toString() === req.params.id) {
                              doc.question.answers[i].downvotes.splice(doc.question.answers[i].downvotes.indexOf(req.user), 1);
                              break;
                            }
                          }
                          doc.downvotes.splice(doc.downvotes.indexOf(req.user), 1);
                        }
                        if(doc.upvotes.indexOf(req.user) > -1) {
                          for(let i = 0; i < doc.question.answers.length; i++) {
                            if(doc.question.answers[i]._id.toString() === req.params.id) {
                              doc.question.answers[i].upvotes.splice(doc.question.answers[i].upvotes.indexOf(req.user), 1);
                              break;
                            }
                          }
                          doc.upvotes.splice(doc.upvotes.indexOf(req.user), 1);
                        } else {
                          for(let i = 0; i < doc.question.answers.length; i++) {
                            if(doc.question.answers[i]._id.toString() === req.params.id) {
                              doc.question.answers[i].upvotes.push(req.user);
                              break;
                            }
                          }
                          doc.upvotes.push(req.user);
                        }
                      } else if(req.body.vote === 'downvote') {
                        if(doc.upvotes.indexOf(req.user) > -1) {
                          for(let i = 0; i < doc.question.answers.length; i++) {
                            if(doc.question.answers[i]._id.toString() === req.params.id) {
                              doc.question.answers[i].upvotes.splice(doc.question.answers[i].upvotes.indexOf(req.user), 1);
                              break;
                            }
                          }
                          doc.upvotes.splice(doc.upvotes.indexOf(req.user), 1);
                        }
                        if(doc.downvotes.indexOf(req.user) > -1) {
                          for(let i = 0; i < doc.question.answers.length; i++) {
                            if(doc.question.answers[i]._id.toString() === req.params.id) {
                              doc.question.answers[i].downvotes.splice(doc.question.answers[i].downvotes.indexOf(req.user), 1);
                              break;
                            }
                          }
                          doc.downvotes.splice(doc.downvotes.indexOf(req.user), 1);
                        } else {
                          for(let i = 0; i < doc.question.answers.length; i++) {
                            if(doc.question.answers[i]._id.toString() === req.params.id) {
                              doc.question.answers[i].downvotes.push(req.user);
                              break;
                            }
                          }
                          doc.downvotes.push(req.user);
                        }
                      }
                      doc.save(err => {
                        if(err) {
                          res.status(500).json(err);
                        } else {
                          res.status(200).json(doc.question);
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
  }

  static accept(req, res) {
    Answer
      .findByIdAndUpdate({
        _id: req.params.id,
      }, {
        isAccepted: true,
      }, {
        new: true,
      })
      .then(answer => {
        res.status(200).json(answer);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
}

module.exports = AnswerController;
