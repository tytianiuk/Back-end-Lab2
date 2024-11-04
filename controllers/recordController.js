import { data } from '../data.js';

export const createRecord = (req, res) => {
  const { id, userId, categoryId, amount, date } = req.body;
  data.records.push({
    id,
    userId,
    categoryId,
    date: date || new Date(),
    amount,
  });
  res.status(201).json({
    message: 'Record is created',
    record: { id, userId, categoryId, date, amount },
  });
};

export const getRecord = (req, res) => {
  const record = data.records.find(
    (record) => record.id === req.params.record_id,
  );
  record
    ? res.json(record)
    : res.status(404).json({ message: 'Record is not found' });
};

export const deleteRecord = (req, res) => {
  const index = data.records.findIndex(
    (record) => record.id === req.params.record_id,
  );
  if (index !== -1) {
    data.records.splice(index, 1);
    res.json({ message: 'Record is deleted' });
  } else {
    res.status(404).json({ message: 'Record is not found' });
  }
};

export const getFilteredRecords = (req, res) => {
  const { userId, categoryId } = req.query;

  if (!userId && !categoryId) {
    return res.status(400).json({
      message:
        'Bad Request: Please provide at least one parameter (userId or categoryId).',
    });
  }

  const filteredRecords = data.records.filter(
    (record) =>
      (!userId || record.userId === userId) &&
      (!categoryId || record.categoryId === categoryId),
  );
  filteredRecords.length > 0
    ? res.json(filteredRecords)
    : res.status(404).json({ message: 'No records are found' });
};
