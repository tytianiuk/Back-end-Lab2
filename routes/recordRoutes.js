import express from 'express';
import {
  createRecord,
  getRecord,
  deleteRecord,
  getFilteredRecords,
} from '../controllers/recordController.js';

const router = express.Router();

router.post('/', createRecord);
router.get('/:record_id', getRecord);
router.delete('/:record_id', deleteRecord);
router.get('', getFilteredRecords);

export default router;
