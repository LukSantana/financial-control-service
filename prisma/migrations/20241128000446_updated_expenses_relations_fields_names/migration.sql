/*
  Warnings:

  - You are about to drop the column `expensesSourcesId` on the `Expenses` table. All the data in the column will be lost.
  - You are about to drop the column `responsiblesId` on the `Expenses` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Expenses" DROP CONSTRAINT "Expenses_expensesSourcesId_fkey";

-- DropForeignKey
ALTER TABLE "Expenses" DROP CONSTRAINT "Expenses_responsiblesId_fkey";

-- AlterTable
ALTER TABLE "Expenses" DROP COLUMN "expensesSourcesId",
DROP COLUMN "responsiblesId",
ADD COLUMN     "expensesSourceId" INTEGER,
ADD COLUMN     "responsibleId" INTEGER;

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_expensesSourceId_fkey" FOREIGN KEY ("expensesSourceId") REFERENCES "ExpensesSources"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "ExpenseResponsibles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
