import Currency from '../models/currency.js';
import { handleError } from '../utils/errorHandler.js';

export const createCurrency = async (req, res) => {
  try {
    const { code, symbol } = req.body;
    const newCurrency = new Currency({ code, symbol });
    await newCurrency.save();
    res.status(201).json({
      message: 'Currency created successfully',
      currency: newCurrency,
    });
  } catch (error) {
    const { status, message, errors } = handleError(error);
    res.status(status).json({ message, errors });
  }
};

export const getCurrency = async (req, res) => {
  try {
    const currency = await Currency.findOne({ code: req.params.currency_code });
    if (!currency) {
      return res.status(404).json({ message: 'Currency not found' });
    }
    res.json(currency);
  } catch (error) {
    const { status, message, errors } = handleError(error);
    res.status(status).json({ message, errors });
  }
};

export const deleteCurrency = async (req, res) => {
  try {
    const currency = await Currency.findOneAndDelete({
      code: req.params.currency_code,
    });
    if (!currency) {
      return res.status(404).json({ message: 'Currency not found' });
    }
    res.json({ message: 'Currency deleted' });
  } catch (error) {
    const { status, message, errors } = handleError(error);
    res.status(status).json({ message, errors });
  }
};
