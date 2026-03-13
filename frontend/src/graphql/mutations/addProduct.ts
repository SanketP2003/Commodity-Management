import { gql } from '@apollo/client';

export const ADD_PRODUCT_MUTATION = gql`
  mutation AddProduct(
    $name: String!
    $description: String!
    $category: String!
    $quantity: Float!
    $unit: String!
    $price: Float!
    $supplier: String!
  ) {
    addProduct(
      name: $name
      description: $description
      category: $category
      quantity: $quantity
      unit: $unit
      price: $price
      supplier: $supplier
    ) {
      id
      name
      description
      category
      quantity
      unit
      price
      supplier
      status
      createdAt
      updatedAt
    }
  }
`;

