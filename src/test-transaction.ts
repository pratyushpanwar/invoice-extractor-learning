import "dotenv/config";
import { createInvoiceWithItems } from "./services/invoice-transaction.service.js";
import { pool } from "./config/db.js";

async function main() {
  try {
    const invoice = await createInvoiceWithItems({
      vendor: "Test Electronics",
      total: 150000,
      items: [
  {
    description: "Laptop",
    quantity: 1,
    unit_price: 140000
  },
  {
    description: "Invalid item",
    quantity: -2,
    unit_price: 5000
  }
]
    });

    console.log("Transaction successful!");
    console.log(invoice);
  } catch (error) {
    console.error("Transaction failed:", error);
  } finally {
    await pool.end();
  }
}

main();