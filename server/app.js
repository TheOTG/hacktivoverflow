require('dotenv').config()
const express = require('express');
const userRouter = require('./routes/user');
const questionRouter = require('./routes/question');
const answerRouter = require('./routes/answer');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const cron = require('./helpers/cron');

cron();

// mongoose.connect(`mongodb://localhost/${process.env.MONGO_DATABASE}`, { useNewUrlParser: true });
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DATABASE}?retryWrites=true`, { useNewUrlParser: true })

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user', userRouter);
app.use('/question', questionRouter);
app.use('/answer', answerRouter);

module.exports = app;
