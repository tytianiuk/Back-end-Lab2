import express from 'express';
import {
  createRecord,
  getRecord,
  deleteRecord,
  getFilteredRecords,
} from '../controllers/recordController.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

router.post('/', authenticate, createRecord);
router.get('/:record_id', authenticate, getRecord);
router.delete('/:record_id', authenticate, deleteRecord);
router.get('', authenticate, getFilteredRecords);

export default router;
