import express from 'express';
const router = express.Router();
import postreset from '../controllers/reset.js';

router.post("/reset-token/:id/:token",postreset);

export default router;