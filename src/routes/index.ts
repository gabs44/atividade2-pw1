import express from 'express';
const router = express.Router()
import userRoutes from './userRoutes';
import routesTechnologies from './technologiesRoutes';

router.use(userRoutes);
router.use(routesTechnologies)

export default router