const Question = require('../models/question');

module.exports = function(req, res, next) {
  try {
    Question
      .findOne({
        _id: req.params.id
      })
      .then(question => {
        if(question.upvotes.indexOf(req.user) > -1 || question.downvotes.indexOf(req.user) > -1) {
          throw new Error(`You already voted`);
        } else {
          next();
        }
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        });
      });
  } catch(err) {
    res.status(403).json({
      message: 'Forbidden'
    });
  }
};
