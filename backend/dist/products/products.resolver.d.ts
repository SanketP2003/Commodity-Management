import { ProductsService } from './products.service';
export declare class ProductsResolver {
    private productsService;
    constructor(productsService: ProductsService);
    products(): Promise<{
        status: import("./product.types").ProductStatus;
        createdAt: string;
        updatedAt: string;
        id: string;
        name: string;
        description: string;
        category: string;
        quantity: number;
        unit: string;
        price: number;
        supplier: string;
    }[]>;
    product(id: string): Promise<{
        status: import("./product.types").ProductStatus;
        createdAt: string;
        updatedAt: string;
        id: string;
        name: string;
        description: string;
        category: string;
        quantity: number;
        unit: string;
        price: number;
        supplier: string;
    }>;
    addProduct(name: string, description: string, category: string, quantity: number, unit: string, price: number, supplier: string): Promise<{
        status: import("./product.types").ProductStatus;
        createdAt: string;
        updatedAt: string;
        id: string;
        name: string;
        description: string;
        category: string;
        quantity: number;
        unit: string;
        price: number;
        supplier: string;
    }>;
    editProduct(id: string, name?: string, description?: string, category?: string, quantity?: number, unit?: string, price?: number, supplier?: string): Promise<{
        status: import("./product.types").ProductStatus;
        createdAt: string;
        updatedAt: string;
        id: string;
        name: string;
        description: string;
        category: string;
        quantity: number;
        unit: string;
        price: number;
        supplier: string;
    }>;
    deleteProduct(id: string): Promise<boolean>;
}
