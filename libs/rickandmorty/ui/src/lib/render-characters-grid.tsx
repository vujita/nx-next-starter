import {
  Pagination,
  Space,
  Grid,
  InputWrapper,
  Input,
  LoadingOverlay,
  Text,
} from '@mantine/core';
import {
  FilterCharacter,
  GetCharactersQuery,
  GetCharactersQueryVariables,
} from '@myorg/rickandmorty/data-access';
import React, { useCallback, useEffect, useState } from 'react';
import { Character } from './character';

const filterTypes: {
  filterKey: keyof FilterCharacter;
  label: string;
}[] = [
  { filterKey: 'name', label: 'Name' },
  { filterKey: 'gender', label: 'Gender' },
  { filterKey: 'species', label: 'Species' },
  // { key: 'status', label: 'Status' },
  // { key: 'type', label: 'Type' },
];
export type RenderCharactersGridProps = {
  page: number;
  isFetching: boolean;
  data?: GetCharactersQuery;
  onFilterChange: (newFilter: GetCharactersQueryVariables['filter']) => void;
  onPageChange: (newPage: number) => void;
} & FilterCharacter;

export default function RenderCharactersGrid({
  page,
  name,
  gender,
  species,
  status,
  type,
  data,
  isFetching,
  onFilterChange,
  onPageChange,
}: RenderCharactersGridProps) {
  const [filterState, setFilterState] = useState<
    GetCharactersQueryVariables['filter']
  >({
    gender,
    name,
    species,
    status,
    type,
  });
  const onFilterKeyChange = useCallback(
    (filerKey: keyof FilterCharacter) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setFilterState((currentFilterState) => ({
          ...currentFilterState,
          [filerKey]: newValue,
        }));
      },
    []
  );
  useEffect(() => {
    setFilterState({
      gender,
      name,
      species,
      status,
      type,
    });
  }, [species, status, type, gender, name]);
  useEffect(() => {
    onFilterChange({ ...filterState });
  }, [filterState, onFilterChange]);
  return (
    <span>
      <LoadingOverlay visible={!!isFetching} />
      <Pagination
        grow
        withControls
        withEdges
        position="center"
        page={page}
        radius="xl"
        onChange={onPageChange}
        total={data?.characters?.info?.pages ?? 0}
      ></Pagination>
      <Space h={10} />
      <Text color="blue" component="div" align="right">
        {data?.characters?.info?.count} Characters
      </Text>
      <Space h={30} />
      {filterTypes.map((ft) => (
        <InputWrapper label={ft.label} key={ft.filterKey}>
          <Input
            value={filterState?.[ft.filterKey] ?? ''}
            onChange={onFilterKeyChange(ft.filterKey)}
          />
        </InputWrapper>
      ))}
      <Space h={30} />
      <Grid gutter="xl">
        {data?.characters?.results?.map((char) => (
          <Grid.Col sm={12} md={6} lg={4} xl={3} key={char?.id}>
            <Character {...char}></Character>
          </Grid.Col>
        ))}
      </Grid>
      <Space h={30} />
      <Pagination
        grow
        withControls
        withEdges
        position="center"
        page={page}
        radius="xl"
        onChange={onPageChange}
        total={data?.characters?.info?.pages ?? 0}
      ></Pagination>
    </span>
  );
}
