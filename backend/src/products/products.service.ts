import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddProductInput, EditProductInput } from './product.input';
import { ProductStatus } from './product.types';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  private computeStatus(quantity: number): ProductStatus {
    if (quantity <= 0) return ProductStatus.OUT_OF_STOCK;
    if (quantity <= 10) return ProductStatus.LOW_STOCK;
    return ProductStatus.IN_STOCK;
  }

  private formatProduct(product: {
    id: string;
    name: string;
    description: string;
    category: string;
    quantity: number;
    unit: string;
    price: number;
    supplier: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    return {
      ...product,
      status: product.status as ProductStatus,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    };
  }

  async findAll() {
    const products = await this.prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return products.map((p) => this.formatProduct(p));
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException(`Product ${id} not found`);
    return this.formatProduct(product);
  }

  async create(input: AddProductInput) {
    const status = this.computeStatus(input.quantity);
    const product = await this.prisma.product.create({
      data: { ...input, status },
    });
    return this.formatProduct(product);
  }

  async update(id: string, input: EditProductInput) {
    const existing = await this.prisma.product.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Product ${id} not found`);

    const newQuantity =
      input.quantity !== undefined ? input.quantity : existing.quantity;
    const status = this.computeStatus(newQuantity);

    const updated = await this.prisma.product.update({
      where: { id },
      data: { ...input, status },
    });
    return this.formatProduct(updated);
  }

  async remove(id: string): Promise<boolean> {
    const existing = await this.prisma.product.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Product ${id} not found`);
    await this.prisma.product.delete({ where: { id } });
    return true;
  }
}

