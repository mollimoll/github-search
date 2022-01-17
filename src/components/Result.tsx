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
    <div className='result-row'>
      <img src={avatarUrl} alt='' />
      <div className='result-content'>
        <h2>{login}</h2>
        <div>
          <h3>Public repos:</h3>
          {repositories.nodes.map(({ name, url }) => (
            <div>
              <a key={name} href={url}>
                {name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
