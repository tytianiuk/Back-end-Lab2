import mongoose from 'mongoose';
import { validateCode, validateSymbol } from '../utils/validation.js';

const currencySchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'The "code" field is required.'],
    unique: true,
    validate: {
      validator: validateCode,
      message:
        'The "code" field must be a 3-letter currency code (e.g., USD, EUR).',
    },
  },
  symbol: {
    type: String,
    required: [true, 'The "symbol" field is required.'],
    validate: {
      validator: validateSymbol,
      message: 'The "symbol" field must be a single character (e.g., $, €, ¥).',
    },
  },
});

const Currency = mongoose.model('Currency', currencySchema);

export default Currency;
