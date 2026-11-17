import { getAllInvoices, getInvoice, addInvoice } from "../services/invoice.service.js";
import { AppError } from "../utils/AppError.js";
export async function getInvoices(req, res, next) {
    try {
        const invoice = await getAllInvoices();
        return res.status(200).json({
            success: true,
            data: invoice
        });
    }
    catch (error) {
        next(error);
    }
}
export async function getInvoiceById(req, res, next) {
    try {
        const invoice = await getInvoice(req.params.id);
        if (!invoice) {
            throw new AppError("Invoice Not Found", 404);
        }
        return res.status(200).json({
            success: true,
            data: invoice
        });
    }
    catch (error) {
        next(error);
    }
}
export async function createInvoice(req, res, next) {
    try {
        const input = req.body;
        const invoice = await addInvoice(input);
        return res.status(201).json({
            success: true,
            data: invoice
        });
    }
    catch (error) {
        next(error);
    }
}
