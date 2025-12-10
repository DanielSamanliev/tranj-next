import gql from "graphql-tag";

export const GET_PRODUCTS = gql`
  query getProducts(
    $locale: I18NLocaleCode!
    $page: Int!
    $filters: ProductFiltersInput
    $sort: [String]
  ) {
    products_connection(
      locale: $locale
      pagination: { page: $page, pageSize: 10 }
      filters: $filters
      sort: $sort
    ) {
      nodes {
        documentId
        title
        price
        description
        image {
          url
        }
        slug
      }
      pageInfo {
        page
        pageCount
      }
    }
  }
`;
