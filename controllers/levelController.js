const { Level } = require('../models/index');

const create = async(req, res) => {
  try {
    const { title, background, color } = req.body;

    const doc = new Level({
      title, background, color
    });
    const level = await doc.save();
    res.json({ level });
  } catch(err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать уровень'
    });
  }
};

const getAll = async(req, res) => {
  try {
    const levels = await Level.find({},
      {
        createdAt: 0, updatedAt: 0, __v:0
      }
    ).sort({ title: 1 });
    return res.json(levels);
  } catch(err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось авторизоваться '
    });
  }
};


module.exports = {
  create,
  getAll
};