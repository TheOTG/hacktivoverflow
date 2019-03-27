const cron = require('node-cron');
const kue = require('kue')
const queue = kue.createQueue();
const Question = require('../models/question');
const mailer = require('./mailer');

function cronJob() {
  cron.schedule('* * * * * 0', () => {
    Question
      .find({})
      .populate('user')
      .then(questions => {
        questions.forEach(question => {
          queue.create('email', {
            email: question.user.email,
            name: question.user.name,
            title: question.title,
            upvotes: question.upvotes.length,
            downvotes: question.downvotes.length,
          })
          .save();
        });
      })
      .catch(err => {
        console.log(err);
      });
    queue.process('email', function(job, done) {
      const text = 
`Hello ${job.data.name},
      
Your question with title "${job.data.title}" has received ${job.data.upvotes} and ${job.data.downvotes}.
Which gives ${job.data.upvotes - job.data.downvotes} reputation to your question.

Thank you for using our platform,

HacktivOverflow`;
      mailer(job.data.email, text);
      done();
    })
  });
}

module.exports = cronJob;