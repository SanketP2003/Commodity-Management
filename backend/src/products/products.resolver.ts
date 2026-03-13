import { Resolver, Query, Mutation, Args, Float } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { ProductsService } from './products.service';
import { ProductType } from './product.types';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Resolver(() => ProductType)
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [ProductType])
  @Roles(Role.MANAGER, Role.STORE_KEEPER)
  async products() {
    return this.productsService.findAll();
  }

  @Query(() => ProductType)
  @Roles(Role.MANAGER, Role.STORE_KEEPER)
  async product(@Args('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Mutation(() => ProductType)
  @Roles(Role.MANAGER, Role.STORE_KEEPER)
  async addProduct(
    @Args('name') name: string,
    @Args('description') description: string,
    @Args('category') category: string,
    @Args('quantity', { type: () => Float }) quantity: number,
    @Args('unit') unit: string,
    @Args('price', { type: () => Float }) price: number,
    @Args('supplier') supplier: string,
  ) {
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

  @Mutation(() => ProductType)
  @Roles(Role.MANAGER, Role.STORE_KEEPER)
  async editProduct(
    @Args('id') id: string,
    @Args('name', { nullable: true }) name?: string,
    @Args('description', { nullable: true }) description?: string,
    @Args('category', { nullable: true }) category?: string,
    @Args('quantity', { type: () => Float, nullable: true }) quantity?: number,
    @Args('unit', { nullable: true }) unit?: string,
    @Args('price', { type: () => Float, nullable: true }) price?: number,
    @Args('supplier', { nullable: true }) supplier?: string,
  ) {
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

  @Mutation(() => Boolean)
  @Roles(Role.MANAGER)
  async deleteProduct(@Args('id') id: string) {
    return this.productsService.remove(id);
  }
}

