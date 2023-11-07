import express from 'express';
const router = express.Router()
import userRoutes from './userRoutes';

router.use(userRoutes);

export default router