import { GraphQLClient } from 'graphql-request';
import { useQuery } from 'react-query';
import { getSdk, GetCharactersQueryVariables } from './generated/graphql';

const IS_BROWSER = typeof window !== 'undefined';
const gqlClient = new GraphQLClient(
  IS_BROWSER
    ? '/api/rickandmorty/graphql'
    : 'https://rickandmortyapi.com/graphql'
);

export const { getCharacters } = getSdk(gqlClient);

export const getCharactersQueryKey = (
  variables: GetCharactersQueryVariables = {}
) => {
  const key = ['characters', JSON.stringify(variables)].join('-');
  return key;
};

export function useGetCharacters(variables: GetCharactersQueryVariables = {}) {
  return useQuery(
    getCharactersQueryKey(variables),
    () => getCharacters(variables),
    {
      keepPreviousData: true,
    }
  );
}
