import { z } from "zod";

export const transactionCreateSchema = z.object({
  title: z.string("Titulo com valor incompativel"),
  type: z.string("Tipo com valor incompativel"),
  amountTotal: z.float64("Valor Liquido com valor incompativel"),
  paidAmount: z.float64().default(0),
  pendingAmount: z.float64().default(0),
  date: z.string("Data com valor incompativel"),
});

export type LoginInput = z.infer<typeof transactionCreateSchema>;
