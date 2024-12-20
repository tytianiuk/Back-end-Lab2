import express from 'express';
import {
  getUser,
  deleteUser,
  registerUser,
  loginUser,
  logoutUser,
} from '../controllers/userController.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', authenticate, logoutUser);
router.get('/:user_id', authenticate, getUser);
router.delete('/:user_id', authenticate, deleteUser);

export default router;
