const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let questionSchema = new Schema({
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
  answers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answers',
  }],
  isAnswered: {
    type: Boolean,
  },
  tags: [{
    type: String,
    enum: ['javascript', 'html', 'css', 'mongoose', 'mongodb'],
  }],
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

let Question = mongoose.model('Questions', questionSchema);

module.exports = Question;
