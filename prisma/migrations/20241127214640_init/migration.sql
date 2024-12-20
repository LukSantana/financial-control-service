-- CreateEnum
CREATE TYPE "EEntryType" AS ENUM ('FIXED', 'VARIABLE');

-- CreateEnum
CREATE TYPE "EExpenseType" AS ENUM ('FIXED', 'VARIABLE');

-- CreateEnum
CREATE TYPE "EExpenseSubcategory" AS ENUM ('CREDIT_CARD', 'BANK_TRANSACTION', 'DEBIT_CARD', 'CASH', 'OTHER');

-- CreateEnum
CREATE TYPE "EInvestmentType" AS ENUM ('FIXED', 'VARIABLE');

-- CreateEnum
CREATE TYPE "EInvestmentCategory" AS ENUM ('STOCKS', 'CRYPTO', 'REAL_STATE', 'FIXED_INCOME', 'TREASURY', 'ETF', 'BDR', 'OTHER');

-- CreateTable
CREATE TABLE "AdvancePayments" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "responsibleId" INTEGER,
    "sourceId" INTEGER NOT NULL,

    CONSTRAINT "AdvancePayments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntrySource" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EntrySource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entries" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "type" "EEntryType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "entriesTypeId" INTEGER NOT NULL,
    "entrySourceId" INTEGER,

    CONSTRAINT "Entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpenseCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExpenseCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpenseResponsibles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExpenseResponsibles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expenses" (
    "id" SERIAL NOT NULL,
    "type" "EExpenseType" NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "installments" INTEGER,
    "paidPercentage" DOUBLE PRECISION,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sourceId" INTEGER NOT NULL,
    "expenseCategoryId" INTEGER NOT NULL,
    "expensesSourcesId" INTEGER,
    "responsiblesId" INTEGER,

    CONSTRAINT "Expenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpensesSources" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "EExpenseSubcategory" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExpensesSources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestmentCategory" (
    "id" SERIAL NOT NULL,
    "name" "EInvestmentCategory" NOT NULL,
    "type" "EInvestmentType" NOT NULL,
    "isNational" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvestmentCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Investments" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION,
    "shares" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Investments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Logs" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "message" TEXT NOT NULL,
    "stack" TEXT NOT NULL,
    "data" JSONB,
    "level" TEXT NOT NULL,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservations" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "objective" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reservations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AdvancePayments" ADD CONSTRAINT "AdvancePayments_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "ExpenseResponsibles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvancePayments" ADD CONSTRAINT "AdvancePayments_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "ExpensesSources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entries" ADD CONSTRAINT "Entries_entrySourceId_fkey" FOREIGN KEY ("entrySourceId") REFERENCES "EntrySource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_expenseCategoryId_fkey" FOREIGN KEY ("expenseCategoryId") REFERENCES "ExpenseCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_expensesSourcesId_fkey" FOREIGN KEY ("expensesSourcesId") REFERENCES "ExpensesSources"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_responsiblesId_fkey" FOREIGN KEY ("responsiblesId") REFERENCES "ExpenseResponsibles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investments" ADD CONSTRAINT "Investments_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "InvestmentCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
