import { GraphQLClient } from 'graphql-request';
import { useQuery, useQueryClient } from 'react-query';
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
  // const key = [
  //   'characters',
  //   variables.page,
  //   JSON.stringify(variables.filter),
  // ].join('-');
  // return key;
  return 'characters';
};

export function useGetCharacters(variables: GetCharactersQueryVariables = {}) {
  return useQuery(
    getCharactersQueryKey(variables),
    () => getCharacters(variables),
    { keepPreviousData: true }
  );
}
