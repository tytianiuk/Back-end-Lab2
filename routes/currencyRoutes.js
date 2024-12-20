import express from 'express';
import {
  createCurrency,
  getCurrency,
  deleteCurrency,
} from '../controllers/currencyController.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

router.post('/', authenticate, createCurrency);
router.get('/:currency_code', authenticate, getCurrency);
router.delete('/:currency_code', authenticate, deleteCurrency);

export default router;
