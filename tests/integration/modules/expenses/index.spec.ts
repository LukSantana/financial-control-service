import { use, expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { ExpensesController } from '../../../../src/modules/expenses/controller/index.controller';
import { ExpensesService } from '../../../../src/modules/expenses/service/index.service';
import { ExpensesRepository } from '../../../../src/modules/expenses/repository/index.repository';
import { prismaClientStub, req, res } from '../../../utils.test';
import { buildExpensesMock } from './mocks/index.test';
import { Request, Response } from 'express';
import { Expenses } from '@prisma/client';
proxyquire.noCallThru();

use(sinonChai)

describe('Expenses Module - Integration Tests', () => {
  let simpleReq: Request;
  let simpleRes: Response;

  const expensesRepository = proxyquire('../../../../src/modules/expenses/repository/index.repository', {
    prisma: prismaClientStub as any
  })

  const expensesController = new ExpensesController(
    new ExpensesService(
      new ExpensesRepository(
        prismaClientStub as any
      )
    ),
  );

  beforeEach(() => {
    simpleReq = ({ ...req }) as unknown as Request;
    simpleRes = ({ ...res }) as unknown as Response;
  });

  afterEach(() => {
    sinon.reset();
    sinon.restore();
  });

  describe('fetchMany', () => {
    let expensesMock: Expenses[];
    beforeEach(() => {
      expensesMock = buildExpensesMock(5);

      prismaClientStub.fetchMany.resolves(expensesMock);
    });

    it('should fetch all expenses', async () => {
      await expensesController.execute(simpleReq, simpleRes, 'fetchMany');

      expect(res.json).to.have.been.calledOnce;
    });
  });
});