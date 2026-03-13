import { gql } from '@apollo/client';

export const EDIT_PRODUCT_MUTATION = gql`
  mutation EditProduct(
    $id: String!
    $name: String
    $description: String
    $category: String
    $quantity: Float
    $unit: String
    $price: Float
    $supplier: String
  ) {
    editProduct(
      id: $id
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

