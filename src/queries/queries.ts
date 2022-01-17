import { gql } from "@apollo/client"

export const SEARCH_USERS = gql`
  query searchUsers($query: String!) {
    search(query: $query, type: USER, first: 10) {
      nodes {
        __typename
        ... on User {
          login
          avatarUrl
          repositories(ownerAffiliations: OWNER, first: 10) {
            nodes {
              name
              url
            }
          }
        }
      }
    }
  }
`
