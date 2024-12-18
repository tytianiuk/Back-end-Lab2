import Category from '../models/category.js';
import { handleError } from '../utils/errorHandler.js';

export const createCategory = async (req, res) => {
  try {
    const { id, name } = req.body;
    const newCategory = new Category({ id, name });
    await newCategory.save();
    res
      .status(201)
      .json({ message: 'Category is created', category: newCategory });
  } catch (error) {
    const { status, message, errors } = handleError(error);
    res.status(status).json({ message, errors });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({
      id: req.params.category_id,
    });
    if (category) {
      res.json({ message: 'Category is deleted' });
    } else {
      res.status(404).json({ message: 'Category is not found' });
    }
  } catch (error) {
    const { status, message, errors } = handleError(error);
    res.status(status).json({ message, errors });
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ id: req.params.category_id });
    if (!category) {
      res.status(404).json({ message: 'Category is not found' });
    }
    res.json(category);
  } catch (error) {
    const { status, message, errors } = handleError(error);
    res.status(status).json({ message, errors });
  }
};
