import { GraphQLClient } from 'graphql-request';
import { getSdk } from './generated/graphql';

const gqlClient = new GraphQLClient(
  // IF this is proxied, then it needs to check for browser
  'https://rickandmortyapi.com/graphql'
);

export const { getCharacters } = getSdk(gqlClient);
