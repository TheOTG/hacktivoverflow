const Question = require('../models/question');

module.exports = function(req, res, next) {
  try {
    Question
      .findOne({
        _id: req.params.id
      })
      .then(question => {
        if(question.user.toString() === req.user.toString()) {
          next();
        } else {
          throw new Error(`Forbidden`);
        }
      })
      .catch(err => {
        res.status(403).json({
          message: err.message
        });
      });
  } catch(err) {
    res.status(403).json({
      message: 'Forbidden'
    });
  }
};
