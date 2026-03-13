import { gql } from '@apollo/client';

export const GET_PRODUCTS_QUERY = gql`
  query GetProducts {
    products {
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

export const GET_PRODUCT_QUERY = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
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

