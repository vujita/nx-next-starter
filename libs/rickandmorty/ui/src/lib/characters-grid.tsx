import { useGetCharacters } from '@myorg/rickandmorty/data-access';
import { Character } from './character';
import { Grid, Pagination, Space } from '@mantine/core';

export type CharactersGridProps = {
  page: number;
  onPageChange: (newPage: number) => void;
};

export function CharactersGrid({
  page,
  onPageChange,
}: CharactersGridProps): JSX.Element {
  const { data } = useGetCharacters({ page });
  return (
    <>
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
    </>
  );
}
