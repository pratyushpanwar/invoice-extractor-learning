import { pool } from '../config/db.js';
export async function CreateInvoiceWithItems(input) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const invoiceResult = await client.query(`INSERT INTO invoices (vendor, total)
             VALUES($1, $2)
             RETURNING *;`, [input.vendor, input.total]);
        const invoice = invoiceResult.rows[0];
        for (const item of input.items) {
            await client.query(`INSERT INTO invoices_items 
                (invoice_id, description, quantity, unit_price)
                 VALUES ($1, $2, $3, $4)`, [
                invoice.id,
                item.description,
                item.quantity,
                item.unit_price
            ]);
        }
        await client.query('COMMIT');
        return invoice;
    }
    catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }
    finally {
        client.release();
    }
}
