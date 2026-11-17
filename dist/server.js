import 'dotenv/config';
import express from 'express';
import invoiceRoutes from './routes/invoice.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';
const app = express();
app.use(express.json());
app.use('/api/invoices', invoiceRoutes);
app.use(errorHandler);
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
