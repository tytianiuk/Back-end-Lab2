import { data } from '../data.js';

export const createCategory = (req, res) => {
  const { id, name } = req.body;
  data.categories.push({ id, name });
  res
    .status(201)
    .json({ message: 'Category is created', category: { id, name } });
};

export const deleteCategory = (req, res) => {
  const index = data.categories.findIndex(
    (category) => category.id === req.params.category_id,
  );
  if (index !== -1) {
    data.categories.splice(index, 1);
    res.json({ message: 'Category is deleted' });
  } else {
    res.status(404).json({ message: 'Category is not found' });
  }
};

export const getCategory = (req, res) => {
  const category = data.categories.find(
    (category) => category.id === req.params.category_id,
  );
  category
    ? res.json(category)
    : res.status(404).json({ message: 'Category is not found' });
};
