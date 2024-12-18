import { handleError } from '../utils/errorHandler.js';
import Record from '../models/record.js';
import User from '../models/user.js';
import { DateTime } from 'luxon';

export const createRecord = async (req, res) => {
  try {
    const { id, userId, categoryId, amount, currency, date } = req.query;

    const user = await User.findOne({ id: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const currencyCode = currency || user.currency;
    const shiftedDate = DateTime.now().plus({ hours: 2 }).toISO();

    const newRecord = new Record({
      id,
      userId,
      categoryId,
      amount,
      currency: currencyCode,
      date: date || shiftedDate,
    });

    await newRecord.save();
    res.status(201).json({
      message: 'Record is created',
      record: newRecord,
    });
  } catch (error) {
    const { status, message, errors } = handleError(error);
    res.status(status).json({ message, errors });
  }
};

export const getRecord = async (req, res) => {
  try {
    const record = await Record.findOne({ id: req.params.record_id });

    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.json(record);
  } catch (error) {
    const { status, message, errors } = handleError(error);
    res.status(status).json({ message, errors });
  }
};

export const deleteRecord = async (req, res) => {
  try {
    const record = await Record.findOneAndDelete({ id: req.params.record_id });

    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.json({ message: 'Record is deleted' });
  } catch (error) {
    const { status, message, errors } = handleError(error);
    res.status(status).json({ message, errors });
  }
};

export const getFilteredRecords = async (req, res) => {
  const { userId, categoryId } = req.query;

  if (!userId && !categoryId) {
    return res.status(400).json({
      message:
        'Bad Request: Please provide at least one parameter (userId or categoryId).',
    });
  }

  try {
    const filter = {};

    if (userId) filter.userId = userId;
    if (categoryId) filter.categoryId = categoryId;

    const filteredRecords = await Record.find(filter);

    if (filteredRecords.length > 0) {
      res.json(filteredRecords);
    } else {
      res.status(404).json({ message: 'No records found' });
    }
  } catch (error) {
    const { status, message, errors } = handleError(error);
    res.status(status).json({ message, errors });
  }
};
