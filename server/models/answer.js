const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let answerSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [10, 'Description is too short'],
  },
  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  }],
  downvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  }],
  isAccepted: {
    type: Boolean,
    default: false,
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Questions',
    required: [true, 'Question is required'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: [true, 'User is required'],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

let Answer = mongoose.model('Answers', answerSchema);

module.exports = Answer;
