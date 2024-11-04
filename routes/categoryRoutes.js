import express from 'express';
import {
  createCategory,
  deleteCategory,
  getCategory,
} from '../controllers/categoryController.js';

const router = express.Router();

router.post('/', createCategory);
router.delete('/:category_id', deleteCategory);
router.get('/:category_id', getCategory);

export default router;
