import { extractInvoice } from "../services/gemini.service.js";
export async function createExtraction(req, res, next) {
    try {
        const { invoiceText } = req.body;
        const extractedInvoice = await extractInvoice(invoiceText);
        return res.status(200).json({ success: true, data: extractedInvoice });
    }
    catch (error) {
        next(error);
    }
}
