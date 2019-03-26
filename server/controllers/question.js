const Question = require('../models/question');
const Answer = require('../models/answer');
const User = require('../models/user');

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

  static post(req, res) {
    req.body.user = req.user;
    Question
      .create({
        ...req.body,
      })
      .then(question => {
        res.status(201).json(question);
      })
      .catch(err => {
        res.status(500).json(err);
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
      .then(question => {
        res.status(200).json(question);
      })
      .catch(err => {
        res.status(500).json(err);
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
      .populate('answers answers.user')
      .then(question => {
        res.status(200).json(question);
      })
      .catch(err => {
        res.status(500).json(err);
      })
  }

  static upvote(req, res) {
    Question
      .findOneAndUpdate({
        _id: req.params.id,
      }, {
        $push: {
          upvotes: req.user,
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

  static downvote(req, res) {
    Question
      .findOneAndUpdate({
        _id: req.params.id,
      }, {
        $push: {
          downvotes: req.user,
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

  static cancelUpvote(req, res) {
    Question
      .findOneAndUpdate({
        _id: req.params.id,
      }, {
        $pull: {
          upvotes: req.user,
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

  static cancelDownvote(req, res) {
    Question
      .findOneAndUpdate({
        _id: req.params.id,
      }, {
        $pull: {
          downvotes: req.user,
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