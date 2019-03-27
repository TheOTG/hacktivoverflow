const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  }
});

function sendMail(to, text) {
  let mailOptions = {
    from: process.env.EMAIL,
    to,
    subject: 'test',
    text,
  }

  transporter.sendMail(mailOptions, function(error, info) {
    if(error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  })
}

module.exports = sendMail;
