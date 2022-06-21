import { GraphQLClient } from 'graphql-request';
import { getSdk } from './generated/graphql';

export const serverGqlClient = getSdk(
  new GraphQLClient('https://rickandmortyapi.com/graphql')
);
