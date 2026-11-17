import { pool } from '../config/db.js'

interface Invoice {
    id: string,
    vendor: string,
    total: number
}

const invoices: Invoice[] = [
    {
    id: "101",
    vendor: "ABC Technologies",
    total: 11800
  },
  {
    id: "102",
    vendor: "XYZ Solutions",
    total: 25000
  }
]

export async function getAllInvoices(){
    const result = await pool.query(
        'SELECT * FROM invoices ORDER BY id'
    )
    return result.rows;
}

export async function getInvoice(id: string){
    const result = await pool.query(
        'SELECT * FROM invoices WHERE id = $1',
        [id]
    );

    return result.rows[0] ?? null;
}

export async function addInvoice(invoice: Omit<Invoice, "id">){
    const result = await pool.query(
        `INSERT INTO invoices (vendor, total) 
         VALUES ($1, $2)
         RETURNING *;`,
         [invoice.vendor, invoice.total]
    )

    return result.rows[0]

}