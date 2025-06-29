type ItemsData = {
    itemsDescription: string,
    qty: number | null,
    rate: number | null,
    igst: number | null,
    cgst: number | null,
    sgst: number | null,
    cess: number | null,
    amount: number | null,
}

type dataType = {
  _id: string,
  user: string,
  invoiceId: string,
  invoiceNumber: string,
  orderDate: string,
  dueDate: string,
  companyName: string,
  address1: string,
  address2: string,
  address3: string,
  billToName: string,
  billToAddress1: string,
  billToAddress2: string,
  billToAddress3: string,
  notes: string,
  tnc: string,
  itemsData: ItemsData[],
  finalAmount: number,
  status: string,
}

export const calculateValue = (data: dataType[], type: string) => {
    return data.reduce((sum: number, item: dataType) => {
        if(type === "pending" && item.status === "Pending") {
            sum = sum + item.finalAmount;
        }
        if(type === "overdue" && item.status === "Overdue") {
            sum = sum + item.finalAmount;
        }
        if(type === "recieved" && item.status === "Recieved") {
            sum = sum + item.finalAmount;
        }
        return sum;
    }, 0);
}