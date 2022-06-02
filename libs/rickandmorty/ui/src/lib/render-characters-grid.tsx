import {
  Pagination,
  Space,
  Grid,
  InputWrapper,
  Input,
  LoadingOverlay,
} from '@mantine/core';
import {
  GetCharactersQuery,
  GetCharactersQueryVariables,
} from '@myorg/rickandmorty/data-access';
import React, { useEffect, useState } from 'react';
import { Character } from './character';

export type RenderCharactersGridProps = {
  page: number;
  name?: string;
  isFetching: boolean;
  data?: GetCharactersQuery;
  onFilterChange: (newFilter: GetCharactersQueryVariables['filter']) => void;
  onPageChange: (newPage: number) => void;
};

export default function RenderCharactersGrid({
  page,
  name,
  data,
  isFetching,
  onFilterChange,
  onPageChange,
}: RenderCharactersGridProps) {
  const [localName, setLocalName] = useState<string | undefined>(name);
  useEffect(() => {
    setLocalName(name);
  }, [name]);
  useEffect(() => {
    onFilterChange({ name: localName });
  }, [localName, onFilterChange]);
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
      <Space h={30} />
      <InputWrapper label="Character Name">
        <Input
          value={localName ?? ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const newName = e.target.value;
            if (!isFetching) {
              setLocalName(newName);
            }
          }}
        />
      </InputWrapper>
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
