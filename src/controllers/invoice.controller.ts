import type { Request, Response, NextFunction } from "express";
import { getAllInvoices, getInvoice, addInvoice } from "../services/invoice.service.js";
import { success } from "zod";

export function getInvoices(req: Request, res: Response){
    const invoice = getAllInvoices()

    res.status(200).json({
    success: true,
    data: invoice
  });
}

export function getInvoiceById(req: Request<{id: string}>, res: Response){
    const invoice = getInvoice(req.params.id)

    if(!invoice){
        return res.status(404).json({
            success: false,
            massage:'Invoice Not Found'
        })
    }
    res.status(200).json({
    success: true,
    data: invoice
  });
}

export function createInvoice(req: Request, res: Response){
    const invoice = addInvoice(req.body)

    res.status(201).json({
    success: true,
    data: invoice
  });
}

