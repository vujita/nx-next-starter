import {
  GetCharactersQueryVariables,
  useGetCharactersQuery,
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
        const vars = {
          ...uiVarsRef.current,
          page: 1,
        };
        setDataVariables(vars);
        if (onFilterChange) {
          onFilterChange(vars);
        }
      }, 500),
    [onFilterChange]
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
  const { data, isFetching } = useGetCharactersQuery(dataVariables, {
    keepPreviousData: true,
  });
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
        const vars = {
          ...dataVariables,
          page: newPage,
        };
        setDataVariables(vars);
        if (onFilterChange) {
          onFilterChange(vars);
        }
      }}
    />
  );
}
