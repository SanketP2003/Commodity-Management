import { InputType, Field, Float } from '@nestjs/graphql';
import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';

@InputType()
export class AddProductInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  category: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  quantity: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  unit: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  price: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  supplier: string;
}

@InputType()
export class EditProductInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  category?: string;

  @Field(() => Float, { nullable: true })
  quantity?: number;

  @Field({ nullable: true })
  unit?: string;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field({ nullable: true })
  supplier?: string;
}

