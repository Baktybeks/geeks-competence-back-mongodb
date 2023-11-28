const { Topic } = require('../models');

const create = async(req, res) => {
  try {
    const { topic } = req.body;
    const doc = new Topic({
      topic
    });
    const create = await doc.save();
    res.json({ create });
  } catch(err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать тему'
    });
  }
};

const getAll = async(req, res) => {
  try {
    const topics = await Topic.find({},
      {
        createdAt: 0, updatedAt: 0, __v:0
      }
    ).sort({ title: 1 });
    return res.json(topics);
  } catch(err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить темы '
    });
  }
};

const deleteOne = async(req, res) => {
  try {
    const { id } = req.params;
    const deletedDoc = await Topic.findByIdAndDelete({ _id: id });
    if (!deletedDoc) {
      return res.status(404).json({ message: 'Тема не найдена' });
    }
    res.json({ success: true });
  } catch(err) {
    console.error(err);
    res.status(500).json({
      message: 'Не удалось удалить тему'
    });
  }
};

const deleteAll = async(req, res) => {
  try {
    const result  = await Topic.deleteMany();
    if (result.deletedCount > 0) {
      res.json({ success: true, message: `Удалено ${result.deletedCount} тем` });
    } else {
      res.json({ success: true, message: `Нет тем для удаления` });
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