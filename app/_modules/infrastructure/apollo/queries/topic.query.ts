import { gql } from "@apollo/client";

export const CREATE_TOPIC = gql`
  mutation AddTopic($input: AddTopicInput!) {
    addTopic(input: $input) {
      name
      _id
      result1
      result2
      result3
      result4
    }
  }
`;

export const UPDATE_TOPIC = gql`
  mutation UpdateTopic($updateTopicId: ID!, $input: UpdateTopicInput!) {
    updateTopic(id: $updateTopicId, input: $input) {
      name
      _id
      result1
      result2
      result3
      result4
    }
  }
`;

export const FIND_MANY_TOPICS = gql`
  query FindManyTopics($topicsInput: FindManyTopicsInput!) {
    findManyTopics(topicsInput: $topicsInput) {
      docs {
        name
        _id
        result1
        result2
        result3
        result4
      }
      hasNextPage
      hasPrevPage
      limit
      nextPage
      offset
      page
      pagingCounter
      prevPage
      totalDocs
      totalPages
    }
  }
`;
