import express from 'express';
import {
  createCurrency,
  getCurrency,
  deleteCurrency,
} from '../controllers/currencyController.js';

const router = express.Router();

router.post('/', createCurrency);
router.get('/:currency_code', getCurrency);
router.delete('/:currency_code', deleteCurrency);

export default router;
