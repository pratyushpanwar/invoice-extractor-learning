import { z } from "zod";

export const CreateInvoiceSchema = z.object({
  vendor: z.string().trim().min(1, "Vendor is required"),
  total: z.number().positive("Total must be positive")
});


export type CreateInvoiceInput = z.infer<typeof CreateInvoiceSchema>;