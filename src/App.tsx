import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import React, { useEffect, useState } from "react"
import "./App.css"
import { SearchInput } from "./components/SearchInput"

const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql",
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("github_token")
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

const CLIENT_ID = "af8cb8cd632a236a6c36"
const REDIRECT_URI = "http://localhost:3000/"

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [token, setToken] = useState<String | undefined>()

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  useEffect(() => {
    const code = window.location.href.match(/\?code=(.*)/)?.[1]
    if (code && !token) {
      setIsLoading(true)
      fetch(`https://githubsearchmolly.herokuapp.com/authenticate/${code}`)
        .then((response) => response.json())
        .then(({ token }) => {
          localStorage.setItem("github_token", token)
          setToken(token)
          setIsLoading(false)
        })
    }
  }, [token])

  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <a
          className='login'
          href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}
        >
          Login
        </a>
        {!isLoading && localStorage.getItem("github_token") && <SearchInput />}
      </div>
    </ApolloProvider>
  )
}

export default App
