export interface Product {
    id: number,
    sku: string;
    name: string;
    description: string;
    unitPrice: number;
    imageUrl: string;
    unitsInStock: number;
    dateCreated: Date;
    lastUpdate: Date;
}
