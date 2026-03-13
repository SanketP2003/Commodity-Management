import { PrismaService } from '../prisma/prisma.service';
import { AddProductInput, EditProductInput } from './product.input';
import { ProductStatus } from './product.types';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    private computeStatus;
    private formatProduct;
    findAll(): Promise<{
        status: ProductStatus;
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
    findOne(id: string): Promise<{
        status: ProductStatus;
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
    create(input: AddProductInput): Promise<{
        status: ProductStatus;
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
    update(id: string, input: EditProductInput): Promise<{
        status: ProductStatus;
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
    remove(id: string): Promise<boolean>;
}
