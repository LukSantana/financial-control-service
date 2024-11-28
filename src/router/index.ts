import { Router } from 'express';
import expensesRouter from '../expenses/router/index.router';

const router = Router();

router.use('/api', expensesRouter);

export default router;