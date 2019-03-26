const Answer = require('../models/answer');

module.exports = function(req, res, next) {
  try {
    Answer
      .findOne({
        _id: req.params.id
      })
      .then(answer => {
        if(answer.upvotes.indexOf(req.user) > -1 || answer.downvotes.indexOf(req.user) > -1) {
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
