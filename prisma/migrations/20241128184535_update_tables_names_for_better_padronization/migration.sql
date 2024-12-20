/*
  Warnings:

  - You are about to drop the column `expensesSourceId` on the `Expenses` table. All the data in the column will be lost.
  - You are about to drop the `EntrySource` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExpenseCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExpenseResponsibles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InvestmentCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AdvancePayments" DROP CONSTRAINT "AdvancePayments_responsibleId_fkey";

-- DropForeignKey
ALTER TABLE "Entries" DROP CONSTRAINT "Entries_entrySourceId_fkey";

-- DropForeignKey
ALTER TABLE "Expenses" DROP CONSTRAINT "Expenses_expenseCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "Expenses" DROP CONSTRAINT "Expenses_expensesSourceId_fkey";

-- DropForeignKey
ALTER TABLE "Expenses" DROP CONSTRAINT "Expenses_responsibleId_fkey";

-- DropForeignKey
ALTER TABLE "Investments" DROP CONSTRAINT "Investments_categoryId_fkey";

-- AlterTable
ALTER TABLE "Expenses" DROP COLUMN "expensesSourceId",
ADD COLUMN     "expenseSourceId" INTEGER;

-- AlterTable
ALTER TABLE "Investments" ADD COLUMN     "investmentCategoryId" INTEGER;

-- DropTable
DROP TABLE "EntrySource";

-- DropTable
DROP TABLE "ExpenseCategory";

-- DropTable
DROP TABLE "ExpenseResponsibles";

-- DropTable
DROP TABLE "InvestmentCategory";

-- CreateTable
CREATE TABLE "EntriesSources" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EntriesSources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpensesCategories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExpensesCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpensesResponsibles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExpensesResponsibles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestmentsCategories" (
    "id" SERIAL NOT NULL,
    "name" "EInvestmentCategory" NOT NULL,
    "type" "EInvestmentType" NOT NULL,
    "isNational" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvestmentsCategories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AdvancePayments" ADD CONSTRAINT "AdvancePayments_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "ExpensesResponsibles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entries" ADD CONSTRAINT "Entries_entrySourceId_fkey" FOREIGN KEY ("entrySourceId") REFERENCES "EntriesSources"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_expenseCategoryId_fkey" FOREIGN KEY ("expenseCategoryId") REFERENCES "ExpensesCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_expenseSourceId_fkey" FOREIGN KEY ("expenseSourceId") REFERENCES "ExpensesSources"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "ExpensesResponsibles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investments" ADD CONSTRAINT "Investments_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "InvestmentsCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Add amount_or_shares_check constraint
ALTER TABLE "Investments"
ADD CONSTRAINT "amount_or_shares_check"
CHECK (
  amount IS NOT NULL OR shares IS NOT NULL
);