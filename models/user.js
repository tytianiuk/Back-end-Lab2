import mongoose from 'mongoose';
import {
  validateId,
  validateName,
  validateCurrency,
} from '../utils/validation.js';

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, 'The "id" field is required.'],
    unique: true,
    validate: {
      validator: validateId,
      message: 'The "id" field must be a positive integer.',
    },
  },
  name: {
    type: String,
    required: [true, 'The "name" field is required.'],
    validate: {
      validator: validateName,
      message:
        'The "name" field must contain only letters and/or numbers and cannot be empty.',
    },
  },
  currency: {
    type: String,
    required: [true, 'The "currency" field is required.'],
    validate: {
      validator: validateCurrency,
      message: 'The "currency" field must reference a valid currency.',
    },
  },
});

userSchema.pre('save', function (next) {
  if (this.name) {
    this.name = this.name.trim();
  }
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
