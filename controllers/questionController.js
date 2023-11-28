const { Question } = require('../models');

const create = async(req, res) => {
  try {
    const { question, subtitleId } = req.body;
    const doc = new Question({
      question, subtitleId
    });
    const create = await doc.save();
    res.json({ create });
  } catch(err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать вопрос'
    });
  }
};

const getAll = async(req, res) => {
  try {
    const question = await Question.find({},
      {
        createdAt: 0, updatedAt: 0, __v:0
      }
    ).sort({ title: 1 });
    return res.json(question);
  } catch(err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить вопросы'
    });
  }
};

const deleteOne = async(req, res) => {
  try {
    const { id } = req.params;
    const deletedDoc = await Question.findByIdAndDelete({ _id: id });
    if (!deletedDoc) {
      return res.status(404).json({ message: 'Вопрос не найдена' });
    }
    res.json({ success: true });
  } catch(err) {
    console.error(err);
    res.status(500).json({
      message: 'Не удалось удалить'
    });
  }
};

const deleteAll = async(req, res) => {
  try {
    const result  = await Question.deleteMany();
    if (result.deletedCount > 0) {
      res.json({ success: true, message: `Удалено ${result.deletedCount} вопросов` });
    } else {
      res.json({ success: true, message: `Нет вопросов для удаления` });
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