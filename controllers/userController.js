import User from '../models/user.js';
import Currency from '../models/currency.js';
import { handleError } from '../utils/errorHandler.js';

export const createUser = async (req, res) => {
  try {
    const { id, name, currency } = req.body;

    const defaultCurrency = await Currency.findOne({ code: currency });
    if (!defaultCurrency) {
      return res.status(400).json({ message: 'Currency not found' });
    }

    const user = new User({ id, name, currency: defaultCurrency.code });
    await user.save();
    res.status(201).json({ message: 'User is created', user });
  } catch (error) {
    const { status, message, errors } = handleError(error);
    res.status(status).json({ message, errors });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.user_id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    const { status, message, errors } = handleError(error);
    res.status(status).json({ message, errors });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ id: req.params.user_id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted', user });
  } catch (error) {
    const { status, message, errors } = handleError(error);
    res.status(status).json({ message, errors });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    const { status, message, errors } = handleError(error);
    res.status(status).json({ message, errors });
  }
};
