const { Subtitle } = require('../models');

const create = async(req, res) => {
  try {
    const { subtitle, topicId, levelId } = req.body;
    console.log(req.body)
    const doc = new Subtitle({
      subtitle, topicId, levelId
    });
    const create = await doc.save();
    res.json({ create });
  } catch(err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать подтему'
    });
  }
};

const getAll = async(req, res) => {
  try {
    const topics = await Subtitle.find({},
      {
        createdAt: 0, updatedAt: 0, __v:0
      }
    ).sort({ title: 1 });
    return res.json(topics);
  } catch(err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить подтемы '
    });
  }
};

const deleteOne = async(req, res) => {
  try {
    const { id } = req.params;
    const deletedDoc = await Subtitle.findByIdAndDelete({ _id: id });
    if (!deletedDoc) {
      return res.status(404).json({ message: 'Подтема не найдена' });
    }
    res.json({ success: true });
  } catch(err) {
    console.error(err);
    res.status(500).json({
      message: 'Не удалось удалить подтему'
    });
  }
};

const deleteAll = async(req, res) => {
  try {
    const result  = await Subtitle.deleteMany();
    if (result.deletedCount > 0) {
      res.json({ success: true, message: `Удалено ${result.deletedCount} подтем` });
    } else {
      res.json({ success: true, message: `Нет подтем для удаления` });
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