"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const product_types_1 = require("./product.types");
let ProductsService = class ProductsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    computeStatus(quantity) {
        if (quantity <= 0)
            return product_types_1.ProductStatus.OUT_OF_STOCK;
        if (quantity <= 10)
            return product_types_1.ProductStatus.LOW_STOCK;
        return product_types_1.ProductStatus.IN_STOCK;
    }
    formatProduct(product) {
        return {
            ...product,
            status: product.status,
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
    async findOne(id) {
        const product = await this.prisma.product.findUnique({ where: { id } });
        if (!product)
            throw new common_1.NotFoundException(`Product ${id} not found`);
        return this.formatProduct(product);
    }
    async create(input) {
        const status = this.computeStatus(input.quantity);
        const product = await this.prisma.product.create({
            data: { ...input, status },
        });
        return this.formatProduct(product);
    }
    async update(id, input) {
        const existing = await this.prisma.product.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException(`Product ${id} not found`);
        const newQuantity = input.quantity !== undefined ? input.quantity : existing.quantity;
        const status = this.computeStatus(newQuantity);
        const updated = await this.prisma.product.update({
            where: { id },
            data: { ...input, status },
        });
        return this.formatProduct(updated);
    }
    async remove(id) {
        const existing = await this.prisma.product.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException(`Product ${id} not found`);
        await this.prisma.product.delete({ where: { id } });
        return true;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map