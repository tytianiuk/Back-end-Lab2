import express from 'express';
import {
  createCategory,
  deleteCategory,
  getAllCategory,
} from '../controllers/categoryController.js';

const router = express.Router();

router.post('/', createCategory);
router.delete('/', deleteCategory);
router.get('/', getAllCategory);

export default router;
