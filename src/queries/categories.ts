import gql from "graphql-tag";

export const GET_CATEGORIES = gql`
  query getCategories($locale: I18NLocaleCode!) {
    categories(locale: $locale) {
      documentId
      title
      icon {
        url
      }
    }
  }
`;
