import {
  FilterCharacter,
  GetCharactersQueryVariables,
  useGetCharacters,
} from '@myorg/rickandmorty/data-access';
import { useEffect, useMemo, useRef, useState } from 'react';
import RenderCharactersGrid from './render-characters-grid';
import debounce from '@myorg/utils/debounce';
import { Button } from '@mantine/core';

export type CharactersGridProps = {
  page: number;
  onFilterChange?: (newVariables: GetCharactersQueryVariables) => void;
} & FilterCharacter;
export function CharactersGrid({
  page,
  name,
  gender,
  species,
  status,
  type,
  onFilterChange,
}: CharactersGridProps): JSX.Element {
  const variablesRef = useRef<GetCharactersQueryVariables>({
    page,
    filter: {
      name,
      gender,
      species,
      status,
      type,
    },
  });
  const [variables, setVariables] = useState<GetCharactersQueryVariables>(
    variablesRef.current
  );
  const updateFilter = useMemo(
    () =>
      debounce(() => {
        const newVars = variablesRef.current;
        const newFilter = newVars.filter ?? {};
        const filter: GetCharactersQueryVariables['filter'] = {};
        for (const k in newFilter) {
          const key = k as keyof GetCharactersQueryVariables['filter'];
          filter[key] = newFilter[key];
        }
        setVariables({
          page: newVars.page,
          filter,
        });
      }, 300),
    []
  );
  useEffect(() => {
    const vRef = variablesRef.current;
    vRef.page = page;
    const filter = vRef.filter ?? {};
    filter.name = name;
    vRef.filter = filter;
    setVariables({ ...vRef });
  }, [page, name]);
  const { data, isError, isFetching } = useGetCharacters(
    variables,
    (newQueryVariables) => {
      if (onFilterChange) {
        onFilterChange(newQueryVariables);
      }
    }
  );
  if (isError || !data?.characters?.info?.count) {
    return (
      <>
        <div>ERROR OCCORRED </div>
        <Button
          onClick={() => {
            setVariables({
              page: 1,
              filter: {},
            });
          }}
        >
          Clear Query
        </Button>
      </>
    );
  }
  return (
    <RenderCharactersGrid
      page={page}
      name={name}
      gender={gender}
      species={species}
      status={status}
      type={type}
      isFetching={isFetching}
      data={data}
      onFilterChange={(newFilter) => {
        let isDiff = false;
        const newFilterKeys = Object.keys(newFilter ?? {});
        if (
          newFilterKeys.length !==
          Object.keys(variablesRef.current.filter ?? {}).length
        ) {
          isDiff = true;
        } else {
          newFilterKeys.forEach((k) => {
            const key = k as keyof FilterCharacter;
            if (newFilter?.[key] !== variablesRef.current?.filter?.[key]) {
              isDiff = true;
            }
          });
        }
        if (isDiff) {
          variablesRef.current.page = 1;
          variablesRef.current.filter = newFilter;
          updateFilter();
        }
      }}
      onPageChange={(newPage) => {
        setVariables({
          page: newPage,
          filter: variablesRef.current.filter,
        });
      }}
    />
  );
}
