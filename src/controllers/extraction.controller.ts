import type { Request, Response, NextFunction } from "express";
import { extractInvoice } from "../services/gemini.service.js";
import type { ExtractInvoiceRequest } from "../schemas/extraction.schema.js";

export async function createExtraction(req: Request<{}, {}, ExtractInvoiceRequest>, res: Response, next: NextFunction) {
    try {
        const { invoiceText } = req.body;
    
        const extractedInvoice = await extractInvoice(invoiceText);
        
        return res.status(200).json({ success: true, data: extractedInvoice });
    } catch (error) {
        next(error)
    }
}

