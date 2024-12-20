import express from 'express';
import {
  createCategory,
  deleteCategory,
  getCategory,
} from '../controllers/categoryController.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

router.post('/', authenticate, createCategory);
router.delete('/:category_id', authenticate, deleteCategory);
router.get('/:category_id', authenticate, getCategory);

export default router;
