import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const link = new HttpLink({
  uri: process.env.HEROKU_URI,
  // Additional options
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});

export default client;
