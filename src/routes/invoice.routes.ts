import { Router } from "express";
import { getInvoices, getInvoiceById, createInvoice } from "../controllers/invoice.controller.js";
import { validateBody } from "../middlewares/validateRequest.js";
import { CreateInvoiceSchema } from "../schemas/invoice.schema.js";
import { createExtraction } from "../controllers/extraction.controller.js";
import { ExtractInvoiceRequestSchema } from "../schemas/extraction.schema.js";

const router = Router()

router.get("/", getInvoices);

router.get("/:id", getInvoiceById);

router.post("/",validateBody(CreateInvoiceSchema) ,createInvoice);

router.post("/extractions", validateBody(ExtractInvoiceRequestSchema), createExtraction);
export default router