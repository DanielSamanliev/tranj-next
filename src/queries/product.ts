import gql from "graphql-tag";

export const GET_PRODUCT_BY_SLUG = gql`
  query getProduct($locale: I18NLocaleCode!, $slug: String!) {
    products(locale: $locale, filters: { slug: { eq: $slug } }) {
      documentId
      title
      price
      description
      longDescription
      slug
      image {
        url
      }
      prepMethods {
        title
        icon {
          url
        }
      }
    }
  }
`;
