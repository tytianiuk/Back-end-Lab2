import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Currency from '../models/currency.js';
import { handleError } from '../utils/errorHandler.js';
import dotenv from 'dotenv';

dotenv.config();
export const registerUser = async (req, res) => {
  const { name, password, currency } = req.body;

  try {
    const defaultCurrency = await Currency.findOne({ code: currency });
    if (!defaultCurrency) {
      return res.status(400).json({ message: 'Currency not found' });
    }

    const newUser = new User({
      name,
      password,
      currency: defaultCurrency.code,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: 'User registered successfully.', userId: newUser.id });
  } catch (error) {
    const { status, message, errors } = handleError(error);
    res.status(status).json({ message, errors });
  }
};

export const loginUser = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: 'Name and password are required.' });
  }

  try {
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password.' });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: '1y',
      },
    );

    res.status(200).json({ message: 'Login successful.', token });
  } catch (error) {
    const { status, message, errors } = handleError(error);
    res.status(status).json({ message, errors });
  }
};

export const logoutUser = async (req, res) => {
  res.status(200).json({ message: 'Logout successful.' });
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
