import gql from "graphql-tag";

export const CREATE_QUESTION = gql`
  mutation createQuestion($data: QuestionInput!) {
    createQuestion(data: $data) {
      documentId
    }
  }
`;
