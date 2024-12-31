import { Router, Application } from 'express';
import createAdvancePaymentsRouter from '../modules/advancePayments/router/index.router';
import createAuthRouter from '../modules/auth/router/index.router';
import createEntriesRouter from '../modules/entries/router/index.router';
import createEntriesSourcesRouter from '@src/modules/entriesSources/router/index.router';
import createExpensesRouter from '../modules/expenses/router/index.router';
import createExpensesCategoriesRouter from '@src/modules/expensesCategories/router/index.router';
import createExpensesResponsiblesRouter from '@src/modules/expensesResponsibles/router/index.router';
import createExpensesSourcesRouter from '@src/modules/expensesSources/router/index.router';
import createInvestmentsRouter from '@src/modules/investments/router/index.router';
import createInvestmentsCategoriesRouter from '@src/modules/investmentsCategories/router/index.router';
import createReservationsRouter from '@src/modules/reservations/router/index.router';

const createUnauthenticatedRouters = (app: Application): Router => {
  const router = Router();

  router.use('/api', createAuthRouter(app));

  return router;
}

const createAuthenticatedRouters = (app: Application): Router => {
  const router = Router();

  router.use('/api', createAdvancePaymentsRouter(app));
  router.use('/api', createEntriesRouter(app));
  router.use('/api', createEntriesSourcesRouter(app));
  router.use('/api', createExpensesRouter(app));
  router.use('/api', createExpensesCategoriesRouter(app));
  router.use('/api', createExpensesResponsiblesRouter(app));
  router.use('/api', createExpensesSourcesRouter(app));
  router.use('/api', createInvestmentsRouter(app));
  router.use('/api', createInvestmentsCategoriesRouter(app));
  router.use('/api', createReservationsRouter(app));

  return router;
}

export { createUnauthenticatedRouters, createAuthenticatedRouters, }