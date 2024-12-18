import express from 'express';
import {
  createUser,
  getUser,
  deleteUser,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/', createUser);
router.get('/:user_id', getUser);
router.delete('/:user_id', deleteUser);

export default router;
