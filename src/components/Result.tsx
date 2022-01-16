import React from "react"

type Repository = {
  name: string
  url: string
}

export type SearchResults = {
  login: string
  avatarUrl: string
  repositories: { nodes: Repository[] }
}

export const Result = ({ login, avatarUrl, repositories }: SearchResults) => {
  return (
    <>
      <p>{login}</p>
      <img src={avatarUrl} alt='' />
      {repositories.nodes.map(({ name, url }) => (
        <a key={name} href={url}>
          {name}
        </a>
      ))}
    </>
  )
}
