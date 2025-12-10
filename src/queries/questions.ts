import gql from "graphql-tag";

export const GET_QUESTIONS = gql`
  query getQuestions($locale: I18NLocaleCode!) {
    questions(locale: $locale) {
      documentId
      question
      answer
    }
  }
`;
