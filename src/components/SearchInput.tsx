import { gql, useLazyQuery } from "@apollo/client"
import React, { useEffect, useState } from "react"
import { SEARCH_USERS } from "../queries/queries"
import { Result, SearchResults } from "./Result"

export const SearchInput = () => {
  const [value, setValue] = useState("")

  const [getUsers, { loading, error, data }] = useLazyQuery(SEARCH_USERS)

  const handleClick = () => {
    getUsers({ variables: { query: value } })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  if (error) {
    return (
      <p>There was an error with the request, please try logging in again.</p>
    )
  }

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
      <div className='results-container'>
        {data?.search.nodes.map((props: SearchResults) => (
          <Result key={props.login} {...props} />
        ))}
      </div>
    </>
  )
}
