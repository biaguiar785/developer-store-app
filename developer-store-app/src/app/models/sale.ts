import { SaleItem } from "./sale-item";

export interface Sale {
    id?: number;
    number?: number;
    customerId: string;
    branchId: string;    
    totalAmount: number;
    discount?: number;
    canceled?: boolean;
    items: SaleItem[];
}