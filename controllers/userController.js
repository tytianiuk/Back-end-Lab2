import { data } from '../data.js';

export const createUser = (req, res) => {
  const { id, name } = req.body;
  data.users.push({ id, name });
  res.status(201).json({ message: 'User is created', user: { id, name } });
};

export const getUser = (req, res) => {
  const user = data.users.find((user) => user.id === req.params.user_id);
  user
    ? res.json(user)
    : res.status(404).json({ message: 'User is not found' });
};

export const deleteUser = (req, res) => {
  const index = data.users.findIndex((user) => user.id === req.params.user_id);
  if (index !== -1) {
    data.users.splice(index, 1);
    res.json({ message: 'User deleted' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const getAllUsers = (req, res) => {
  res.json(data.users);
};
