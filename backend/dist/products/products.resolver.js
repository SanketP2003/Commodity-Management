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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const products_service_1 = require("./products.service");
const product_types_1 = require("./product.types");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
let ProductsResolver = class ProductsResolver {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async products() {
        return this.productsService.findAll();
    }
    async product(id) {
        return this.productsService.findOne(id);
    }
    async addProduct(name, description, category, quantity, unit, price, supplier) {
        return this.productsService.create({
            name,
            description,
            category,
            quantity,
            unit,
            price,
            supplier,
        });
    }
    async editProduct(id, name, description, category, quantity, unit, price, supplier) {
        return this.productsService.update(id, {
            name,
            description,
            category,
            quantity,
            unit,
            price,
            supplier,
        });
    }
    async deleteProduct(id) {
        return this.productsService.remove(id);
    }
};
exports.ProductsResolver = ProductsResolver;
__decorate([
    (0, graphql_1.Query)(() => [product_types_1.ProductType]),
    (0, roles_decorator_1.Roles)(client_1.Role.MANAGER, client_1.Role.STORE_KEEPER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsResolver.prototype, "products", null);
__decorate([
    (0, graphql_1.Query)(() => product_types_1.ProductType),
    (0, roles_decorator_1.Roles)(client_1.Role.MANAGER, client_1.Role.STORE_KEEPER),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsResolver.prototype, "product", null);
__decorate([
    (0, graphql_1.Mutation)(() => product_types_1.ProductType),
    (0, roles_decorator_1.Roles)(client_1.Role.MANAGER, client_1.Role.STORE_KEEPER),
    __param(0, (0, graphql_1.Args)('name')),
    __param(1, (0, graphql_1.Args)('description')),
    __param(2, (0, graphql_1.Args)('category')),
    __param(3, (0, graphql_1.Args)('quantity', { type: () => graphql_1.Float })),
    __param(4, (0, graphql_1.Args)('unit')),
    __param(5, (0, graphql_1.Args)('price', { type: () => graphql_1.Float })),
    __param(6, (0, graphql_1.Args)('supplier')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number, String, Number, String]),
    __metadata("design:returntype", Promise)
], ProductsResolver.prototype, "addProduct", null);
__decorate([
    (0, graphql_1.Mutation)(() => product_types_1.ProductType),
    (0, roles_decorator_1.Roles)(client_1.Role.MANAGER, client_1.Role.STORE_KEEPER),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('name', { nullable: true })),
    __param(2, (0, graphql_1.Args)('description', { nullable: true })),
    __param(3, (0, graphql_1.Args)('category', { nullable: true })),
    __param(4, (0, graphql_1.Args)('quantity', { type: () => graphql_1.Float, nullable: true })),
    __param(5, (0, graphql_1.Args)('unit', { nullable: true })),
    __param(6, (0, graphql_1.Args)('price', { type: () => graphql_1.Float, nullable: true })),
    __param(7, (0, graphql_1.Args)('supplier', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Number, String, Number, String]),
    __metadata("design:returntype", Promise)
], ProductsResolver.prototype, "editProduct", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, roles_decorator_1.Roles)(client_1.Role.MANAGER),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsResolver.prototype, "deleteProduct", null);
exports.ProductsResolver = ProductsResolver = __decorate([
    (0, graphql_1.Resolver)(() => product_types_1.ProductType),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsResolver);
//# sourceMappingURL=products.resolver.js.map