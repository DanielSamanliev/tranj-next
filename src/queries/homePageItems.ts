import gql from "graphql-tag";

export const GET_HOMEPAGE_ITEMS = gql`
  query getHomepageItems($locale: I18NLocaleCode!) {
    products(locale: $locale, filters: { isFeatured: { eq: true } }) {
      documentId
      title
      description
      longDescription
      image {
        url
        previewUrl
      }
      price
      slug
    }
    questions(locale: $locale, filters: { answer: { not: null } }) {
      documentId
      question
      answer
    }
  }
`;
