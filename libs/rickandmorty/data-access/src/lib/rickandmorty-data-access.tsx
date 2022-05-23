import { GraphQLClient } from 'graphql-request';
import { useQuery } from 'react-query';
import { getSdk, GetCharactersQueryVariables } from './generated/graphql';

const gqlClient = new GraphQLClient(
  // IF this is proxied, then it needs to check for browser
  'https://rickandmortyapi.com/graphql'
);

export const { getCharacters } = getSdk(gqlClient);

export const getCharactersQueryKey = (
  variables: GetCharactersQueryVariables = {}
) => {
  const key = ['characters', JSON.stringify(variables)].join('-');
  return key;
};

export function useGetCharacters(variables: GetCharactersQueryVariables = {}) {
  return useQuery(getCharactersQueryKey(variables), () =>
    getCharacters(variables)
  );
}
