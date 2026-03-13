import { ObjectType, Field, Float, registerEnumType } from '@nestjs/graphql';

export enum ProductStatus {
  IN_STOCK = 'IN_STOCK',
  LOW_STOCK = 'LOW_STOCK',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
}

registerEnumType(ProductStatus, {
  name: 'ProductStatus',
  description: 'Stock status of the product',
});

@ObjectType()
export class ProductType {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  category: string;

  @Field(() => Float)
  quantity: number;

  @Field()
  unit: string;

  @Field(() => Float)
  price: number;

  @Field()
  supplier: string;

  @Field(() => ProductStatus)
  status: ProductStatus;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}

