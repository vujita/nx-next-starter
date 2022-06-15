import {
  Pagination,
  Space,
  Grid,
  LoadingOverlay,
  Text,
  Group,
  Input,
  InputWrapper,
  Button,
} from '@mantine/core';
import {
  FilterCharacter,
  GetCharactersQuery,
} from '@myorg/rickandmorty/data-access';
import { useCallback } from 'react';
import { Character } from './character';

export type RenderCharactersGridProps = {
  page: number;
  filter: FilterCharacter;
  isFetching: boolean;
  data?: GetCharactersQuery;
  onFilterUpdate: (partialFilter: Partial<FilterCharacter>) => void;
  onPageChange: (newPage: number) => void;
};
const filterTypes: {
  filterKey: keyof FilterCharacter;
  label: string;
}[] = [
  { filterKey: 'name', label: 'Name' },
  { filterKey: 'gender', label: 'Gender' },
  { filterKey: 'species', label: 'Species' },
  { filterKey: 'status', label: 'Status' },
  { filterKey: 'type', label: 'Type' },
];
export default function RenderCharactersGrid({
  page,
  filter,
  data,
  isFetching,
  onFilterUpdate,
  onPageChange,
}: RenderCharactersGridProps) {
  const onFilterKeyChange = useCallback(
    (filerKey: keyof FilterCharacter) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        onFilterUpdate({
          [filerKey]: newValue,
        });
      },
    [onFilterUpdate]
  );
  const charCount = data?.characters?.info?.count ?? 0;
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
      <Group direction="row">
        <Text color="blue">{charCount} Characters</Text>
        {!charCount && (
          <Button
            onClick={() => {
              onFilterUpdate({
                gender: '',
                name: '',
                species: '',
                status: '',
                type: '',
              });
            }}
          >
            Clear Filter
          </Button>
        )}
      </Group>
      <Space h={30} />
      {filterTypes.map((ft) => (
        <InputWrapper label={ft.label} key={ft.filterKey}>
          <Input
            key={`${ft.filterKey}-input`}
            value={filter?.[ft.filterKey] || ''}
            onChange={onFilterKeyChange(ft.filterKey)}
          />
        </InputWrapper>
      ))}
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
