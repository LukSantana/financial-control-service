import { Router } from 'express';
import expensesRouter from '../modules/expenses/router/index.router';
import expensesCategoriesRouter from '../modules/expensesCategories/router/index.router';

const router = Router();

router.use('/api', expensesRouter);
router.use('/api', expensesCategoriesRouter);

export default router;