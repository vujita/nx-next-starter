import {
  GetCharactersQueryVariables,
  useGetCharacters,
} from '@myorg/rickandmorty/data-access';
import { useEffect, useMemo, useRef, useState } from 'react';
import RenderCharactersGrid from './render-characters-grid';
import debounce from '@myorg/utils/debounce';

export type CharactersGridProps = {
  initVars: {
    page: GetCharactersQueryVariables['page'];
    filter: GetCharactersQueryVariables['filter'];
  };
  onFilterChange?: (newVariables: GetCharactersQueryVariables) => void;
};
export function CharactersGrid({
  initVars,
  onFilterChange,
}: CharactersGridProps): JSX.Element {
  const uiVarsRef = useRef<GetCharactersQueryVariables>(initVars);
  const [uiVariables, setUiVariables] =
    useState<GetCharactersQueryVariables>(initVars);
  uiVarsRef.current = uiVariables;
  const [dataVariables, setDataVariables] =
    useState<GetCharactersQueryVariables>(uiVariables);
  const updateFilter = useMemo(
    () =>
      debounce(() => {
        setDataVariables({
          ...uiVarsRef.current,
          page: 1,
        });
      }, 500),
    []
  );
  useEffect(() => {
    const vars: GetCharactersQueryVariables = {
      page: initVars.page ?? 1,
      filter: initVars.filter ?? {},
    };
    setUiVariables({
      ...vars,
    });
    setDataVariables({ ...vars });
  }, [initVars.filter, initVars.page]);
  const { data, isFetching } = useGetCharacters(
    dataVariables,
    (newQueryVariables) => {
      if (onFilterChange) {
        onFilterChange(newQueryVariables);
      }
    }
  );
  return (
    <RenderCharactersGrid
      page={uiVariables.page ?? 1}
      filter={{
        ...uiVariables?.filter,
      }}
      isFetching={isFetching}
      data={data}
      onFilterUpdate={(newFilter) => {
        setUiVariables((currentUiFilter) => ({
          ...currentUiFilter,
          filter: {
            ...currentUiFilter.filter,
            ...newFilter,
          },
        }));
        updateFilter();
      }}
      onPageChange={(newPage) => {
        setDataVariables((current) => ({
          ...current,
          page: newPage,
        }));
      }}
    />
  );
}
