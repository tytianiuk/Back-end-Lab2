import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import {
  validateName,
  validateCurrency,
  validatePassword,
} from '../utils/validation.js';

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    default: () => new mongoose.Types.ObjectId().toString(),
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
  password: {
    type: String,
    required: [true, 'The "password" field is required.'],
    minlength: [8, 'The "password" field must be at least 8 characters long.'],
    validate: {
      validator: validatePassword,
      message:
        'The "password" field must contain at least one letter and one digit.',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  if (this.name) {
    this.name = this.name.trim();
  }
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
