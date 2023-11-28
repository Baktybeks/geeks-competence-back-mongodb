const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/index');

const token = (id, email, role) => {
  return jwt.sign(
    { id, email, role },
    process.env.SECRET_KEY,
    { expiresIn: '24h' }
  );
};

const registration = async(req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      return res.status(500).json({
        message: 'Пользователь с таким email уже существует'
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const doc = new User({
      email, name, role, passwordHash: hash
    });
    const user = await doc.save();
    const { passwordHash, ...userData } = user._doc;
    res.json({ userData, token: token(user._id) });
  } catch(err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось зарегаться'
    });
  }
};

const login = async(req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден'
      });
    }
    const isValidPass = await bcrypt.compare(password, user._doc.passwordHash);
    if (!isValidPass) {
      return res.status(400).json({
        message: 'Неверный логин или пароль'
      });
    }
    const { passwordHash, ...userData } = user._doc;
    res.json({ userData, token: token(user._id) });
  } catch(err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось авторизоваться '
    });
  }
};

const getAllUsers = async(req, res) => {
  try {
    const users = await User.find({ role: 'USER' }, { _id: 1, name: 1 }).sort({ name: 1 });
    return res.json(users);
  } catch(err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось авторизоваться '
    });
  }
};
const getAllAdminUsers = async(req, res) => {
  try {
    const { role } = req.params;
    const users = await User.find({ role }, { _id: 1, name: 1, role: 1 }).sort({ name: 1 });
    return res.json(users);
  } catch(err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось авторизоваться '
    });
  }
};

const getOneUser = async(req, res) => {
  try {
    const { id } = req.params;
    const users = await User.find({ id }, { _id: 1, name: 1, role: 1, email: 1 }).sort({ name: 1 });
    return res.json(users);
  } catch(err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось авторизоваться '
    });
  }
};


module.exports = {
  registration,
  login,
  getAllUsers,
  getAllAdminUsers,
  getOneUser
};