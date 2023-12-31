const { Level } = require('../models/');

const create = async(req, res) => {
  try {
    const { title, background, color } = req.body;
    const doc = new Level({
      title, background, color
    });
    const create = await doc.save();
    res.json({ create });
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
      message: 'Не удалось получить уровни '
    });
  }
};
const deleteOne = async(req, res) => {
  try {
    const { id } = req.params;
    const deletedDoc = await Level.findByIdAndDelete({ _id: id });
    if (!deletedDoc) {
      return res.status(404).json({ message: 'Статья не найдена' });
    }
    res.json({ success: true });
  } catch(err) {
    console.error(err);
    res.status(500).json({
      message: 'Не удалось удалить статью'
    });
  }
};

const deleteAll = async(req, res) => {
  try {
    const result  = await Level.deleteMany();
    if (result.deletedCount > 0) {
      res.json({ success: true, message: `Удалено ${result.deletedCount} документов` });
    } else {
      res.json({ success: true, message: `Нет уровней для удаления` });
    }
  } catch(err) {
    console.error(err);
    res.status(500).json({
      message: 'Не удалось удалить'
    });
  }
};
module.exports = {
  create,
  getAll,
  deleteOne,
  deleteAll
};