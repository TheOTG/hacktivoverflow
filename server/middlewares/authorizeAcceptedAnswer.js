const Answer = require('../models/answer');

module.exports = function(req, res, next) {
  try {
    Answer
      .findOne({
        _id: req.params.id
      })
      .populate('question')
      .then(answer => {
        if(answer.question.user.toString() === req.user.toString()) {
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
