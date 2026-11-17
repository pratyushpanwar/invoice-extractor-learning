import { pool } from '../config/db.js';

interface InvoiceItemInput {
    description: string;
    quantity: number;
    unit_price: number;
}

interface CreateInvoiceWithItemsInput {
    vendor: string;
    total: number;
    items: InvoiceItemInput[];
}

export async function createInvoiceWithItems( input: CreateInvoiceWithItemsInput){

    const client = await pool.connect();
    let transactionStarted = false;

    try {
        await client.query('BEGIN');
        transactionStarted = true;
        const invoiceResult = await client.query(
            `INSERT INTO invoices (vendor, total)
             VALUES($1, $2)
             RETURNING *;`,
            [input.vendor, input.total]
        )

        const invoice = invoiceResult.rows[0];

        for( const item of input.items){
            await client.query(
                `INSERT INTO invoice_items 
                (invoice_id, description, quantity, unit_price)
                 VALUES ($1, $2, $3, $4)`,
                [
                    invoice.id, 
                    item.description, 
                    item.quantity, 
                    item.unit_price
                ]
            );
        }

        await client.query('COMMIT');
        transactionStarted = false;

        return invoice;
    } catch (error) {
        if(transactionStarted) {
            try {
                await client.query('ROLLBACK');
            } catch (rollbackError) {
                console.error('Rollback failed:', rollbackError);
            }
        }
        throw error;
    } finally {
        client.release();
    }
}