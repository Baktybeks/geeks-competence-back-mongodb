const { Answer } = require('../models');

const updateStatus = async (req, res) => {
  try {
    const { status, userId, questionId } = req.body;

    let answeredData = await Answer.findOne({ userId, questionId });

    if (!answeredData) {
      const doc = new Answer({
        status,
        userId,
        questionId,
      });
      await doc.save();
      return res.json({ doc });
    } else {
      answeredData.status = status;
      await answeredData.save();
      return res.json({ doc: answeredData });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать/обновить ответ',
    });
  }
};




const getAll = async(req, res) => {
  try {
    const answer = await Answer.find({},
      {
        createdAt: 0, updatedAt: 0, __v:0
      }
    ).sort({ title: 1 });
    return res.json(answer);
  } catch(err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить ответы'
    });
  }
};
const getOneUser = async(req, res) => {
  const {id} = req.params
  try {
    const answer = await Answer.find({userId: id});
    return res.json(answer);
  } catch(err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить ответы'
    });
  }
};

module.exports = {
  getAll,
  getOneUser,
  updateStatus
};