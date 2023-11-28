const mongoose = require('mongoose');


const User = mongoose.model('User',
  new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, default: 'USER' },
  }, { timestamps: true })
);

const Level = mongoose.model('Level',
  new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    background: { type: String, required: true },
    color: { type: String, required: true },
  }, { timestamps: true })
);

const Topic = mongoose.model('Topic',
  new mongoose.Schema({
    topic: { type: String, required: true },
  }, { timestamps: true })
);

const Subtitle = mongoose.model('Subtitle',
  new mongoose.Schema({
    subtitle: { type: String, required: true },
  }, { timestamps: true })
);

const Question = mongoose.model('Question',
  new mongoose.Schema({
    question: { type: String, required: true },
  }, { timestamps: true })
);

const Answer = mongoose.model('Answer',
  new mongoose.Schema({
    status: { type: Boolean, default: false },
  }, { timestamps: true })
);

module.exports = {
  User,
  Level,
  Topic,
  Subtitle,
  Question,
  Answer,
};
