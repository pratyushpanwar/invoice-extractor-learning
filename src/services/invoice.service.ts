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

export function getAllInvoices(){
    return invoices
}

export function getInvoice(id: string){
    return invoices.find((invoice) => invoice.id === id)
}

export function addInvoice(invoice: Omit<Invoice, "id">){
    const newInvoice: Invoice = {
        id: crypto.randomUUID(),
        ...invoice
    }

    invoices.push(newInvoice);

    return newInvoice;
}