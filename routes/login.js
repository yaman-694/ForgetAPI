import express from 'express';
const router = express.Router();
import Postlogin from '../controllers/login.js';

router.post("/login",Postlogin);

export default router;