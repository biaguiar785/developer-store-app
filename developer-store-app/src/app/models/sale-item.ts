export interface SaleItem {
    productId: number;
    quantity: number;
    price: number;
    totalAmount: number;
    discount: number;
    isCanceled: boolean;
}