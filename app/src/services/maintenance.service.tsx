import { gql, useQuery } from "@apollo/client";

export const GET_ALL_REQUESTS = gql`
  query getAllRequest {
    requests {
      id
      title
      description
      statusDisplay
      status
      isResolved
    }
  }
`;

export const GET_ONE_REQUEST = gql`
  query getOneRequest($id: Int!) {
    request(id: $id) {
      id
      title
      description
      statusDisplay
      status
      isResolved
    }
  }
`;

export const OPEN_REQUEST = gql`
  query openRequest {
    openRequests
  }
`;
export const AVERAGE_RESOLUTION_TIME = gql`
  query averageResolutionTime {
    averageResolutionTime
  }
`;

export const OPEN_REQUEST_URGENT = gql`
  query openUrgentRequests {
    openUrgentRequests
  }
`;

export const MUTATION_UPDATE_REQUEST = gql`
  mutation updateRequest(
    $id: Int!
    $title: String
    $description: String
    $isResolved: Boolean
    $statusDisplay: String
  ) {
    updateRequest(
      id: $id
      title: $title
      description: $description
      isResolved: $isResolved
      statusDisplay: $statusDisplay
    ) {
      id
      title
      description
      isResolved
      statusDisplay
    }
  }
`;
export const MUTATION_CREATE_REQUEST = gql`
  mutation createRequest(
    $title: String!
    $description: String!
    $status: String!
    $isResolved: Boolean!
  ) {
    createRequest(
      title: $title
      description: $description
      status: $status
      isResolved: $isResolved
    ) {
      id
      title
      description
      status
      isResolved
    }
  }
`;
