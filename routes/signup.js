import express from 'express';
const router = express.Router();
import PostRegister from '../controllers/signup.js';

router.post("/signup",PostRegister);

export default router;