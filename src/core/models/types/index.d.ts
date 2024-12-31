import { EntryDTO } from "@src/modules/entries/models/index.model";
import { ExpenseDTO } from "@src/modules/expenses/models/index.model";
import { ExpenseCategoryDTO } from "@src/modules/expensesCategories/models/index.model";
import { ExpenseResponsibleDTO } from "@src/modules/expensesResponsibles/models/index.model";
import { ExpenseSourceDTO } from "@src/modules/expensesSources/models/index.model";
import { InvestmentDTO } from "@src/modules/investments/models/index.model";
import { InvestmentCategoryDTO } from "@src/modules/investmentsCategories/models/index.model";
import { ReservationDTO } from "@src/modules/reservations/models/index.model";

export type TDTOOptions =
  ExpenseDTO |
  ExpenseCategoryDTO |
  ExpenseResponsibleDTO |
  EntryDTO |
  ExpenseSourceDTO |
  InvestmentDTO |
  ReservationDTO |
  InvestmentCategoryDTO |
  AdvancePaymentDTO