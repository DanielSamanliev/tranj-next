import gql from "graphql-tag";

export const GET_PRODUCT_SLUGS = gql`
  query getProductSlugs($locale: I18NLocaleCode!) {
    products(locale: $locale) {
      slug
    }
  }
`;
