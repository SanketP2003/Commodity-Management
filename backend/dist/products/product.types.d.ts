export declare enum ProductStatus {
    IN_STOCK = "IN_STOCK",
    LOW_STOCK = "LOW_STOCK",
    OUT_OF_STOCK = "OUT_OF_STOCK"
}
export declare class ProductType {
    id: string;
    name: string;
    description: string;
    category: string;
    quantity: number;
    unit: string;
    price: number;
    supplier: string;
    status: ProductStatus;
    createdAt: string;
    updatedAt: string;
}
