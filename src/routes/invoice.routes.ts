import { Router } from "express";
import { getInvoices, getInvoiceById, createInvoice } from "../controllers/invoice.controller.js";


const router = Router()

router.get("/", getInvoices);

router.get("/:id", getInvoiceById);

router.post("/", createInvoice);

export default router