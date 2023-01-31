import express from 'express';
const router = express.Router();
import Postforget  from '../controllers/forget-password.js';

router.route("/forget").post(Postforget);

export default router;