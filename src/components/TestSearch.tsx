import React from "react"
import { gql, useQuery } from "@apollo/client"

const GET_USERS = gql`
  query {
    user(login: "mollimoll") {
      name
    }
  }
`

export const TestSearch = () => {
  const { loading, error, data } = useQuery(GET_USERS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const {
    user: { name },
  } = data

  return (
    <div>
      <p>{name}</p>
    </div>
  )
}
