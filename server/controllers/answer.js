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
      .populate('user question')
      .then(answer => {
        res.status(200).json(answer);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }

  static upvote(req, res) {
    Answer
      .findOneAndUpdate({
        _id: req.params.id,
      }, {
        $push: {
          upvotes: req.user,
        }
      }, {
        new: true,
      })
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

  static downvote(req, res) {
    Answer
      .findOneAndUpdate({
        _id: req.params.id,
      }, {
        $push: {
          downvotes: req.user,
        }
      }, {
        new: true,
      })
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

  static cancelUpvote(req, res) {
    Answer
      .findOneAndUpdate({
        _id: req.params.id,
      }, {
        $pull: {
          upvotes: req.user,
        }
      }, {
        new: true,
      })
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

  static cancelDownvote(req, res) {
    Answer
      .findOneAndUpdate({
        _id: req.params.id,
      }, {
        $pull: {
          downvotes: req.user,
        }
      }, {
        new: true,
      })
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
