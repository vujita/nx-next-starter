import { GraphQLClient } from 'graphql-request';
import { useEffect, useMemo, useRef } from 'react';
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

export function useGetCharacters(
  variables: GetCharactersQueryVariables = {},
  onQueryChange?: (queryVars: GetCharactersQueryVariables) => void
) {
  const onQueryChangeRef = useRef(onQueryChange);
  const variablesRef = useRef(variables);
  onQueryChangeRef.current = onQueryChange;
  variablesRef.current = variables;
  const queryKey = useMemo(() => getCharactersQueryKey(variables), [variables]);
  useEffect(() => {
    if (onQueryChangeRef.current) {
      onQueryChangeRef.current(variablesRef.current);
    }
  }, [queryKey]);
  return useQuery(queryKey, () => getCharacters(variables), {
    keepPreviousData: true,
  });
}
