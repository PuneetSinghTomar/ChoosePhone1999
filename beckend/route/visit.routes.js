import express from 'express';
import { recordVisit } from '../controller/visit.controller.js';

const router = express.Router();

router.post('/record', recordVisit);

export default router;
