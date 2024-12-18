import mongoose from 'mongoose';
import { validateId, validateName } from '../utils/validation.js';

const categorySchema = new mongoose.Schema({
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
});

categorySchema.pre('save', function (next) {
  if (this.name) {
    this.name = this.name.trim();
  }
  next();
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
