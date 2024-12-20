import mongoose from 'mongoose';
import {
  validateId,
  validateAmount,
  validateDate,
  validateCurrency,
} from '../utils/validation.js';

const recordSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, 'The "id" field is required.'],
    unique: true,
    validate: {
      validator: validateId,
      message: 'The "id" field must be a non-negative integer.',
    },
  },
  userId: {
    type: String,
    required: [true, 'The "userId" field is required.'],
  },
  categoryId: {
    type: Number,
    required: [true, 'The "categoryId" field is required.'],
    validate: {
      validator: validateId,
      message: 'The "categoryId" field must be a non-negative integer.',
    },
  },
  amount: {
    type: Number,
    required: [true, 'The "amount" field is required.'],
    validate: {
      validator: validateAmount,
      message: 'The "amount" field must be a positive number.',
    },
  },
  currency: {
    type: String,
    required: false,
    validate: {
      validator: validateCurrency,
      message: 'The "defaultCurrency" field must reference a valid currency.',
    },
  },
  date: {
    type: Date,
    default: Date.now,
    validate: {
      validator: validateDate,
      message: 'The "date" field must be a valid date.',
    },
  },
});

const Record = mongoose.model('Record', recordSchema);

export default Record;
