import { gql, useLazyQuery } from "@apollo/client"
import React, { useEffect, useState } from "react"
import { Result, SearchResults } from "./Result"

const SEARCH_USERS = gql`
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

export const SearchInput = () => {
  const [value, setValue] = useState("")

  const [getUsers, { loading, error, data }] = useLazyQuery(SEARCH_USERS)

  const handleClick = () => {
    getUsers({ variables: { query: value } })
    console.log("click")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <>
      <input
        placeholder='Search for a GitHub username'
        aria-label='GitHub username search input field'
        id='search-input'
        onChange={handleChange}
        value={value}
      />
      <button onClick={handleClick}>Search</button>
      {data?.search.nodes.map((props: SearchResults) => (
        <Result key={props.login} {...props} />
      ))}
    </>
  )
}
