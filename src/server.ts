import 'dotenv/config';
import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req,res) => {
  res.send("Invoice Extractor API is running");
})

app.get("/api/invoices", (req, res) => {
  res.json({
    message: "Fetching invoices",
    vendor: req.query.vendor,
    page: req.query.page
  });
});

app.get("/api/invoices/:id", (req, res) => {
  res.json({
    message: "Fetching invoice",
    id: req.params.id
  });
});

app.post("/api/invoices", (req, res) => {
  res.status(201).json({
    message: "Invoice received",
    invoice: req.body
  });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
})