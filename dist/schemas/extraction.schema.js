import { z } from "zod";
export const InvoiceExtractionSchema = z.object({
    invoice_number: z.string(),
    vendor: z.string(),
    date: z.string(),
    subtotal: z.number(),
    tax: z.number(),
    total: z.number(),
});
export const ExtractInvoiceRequestSchema = z.object({
    invoiceText: z.string().trim().min(1, "Invoice text is required"),
});
