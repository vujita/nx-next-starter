import {
  useGetCharacters,
  getCharacters,
  getCharactersQueryKey,
} from '@myorg/rickandmorty/data-access';
import { dehydrate, QueryClient } from 'react-query';
import { Center, Loader } from '@mantine/core';

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  const variables = {};
  await queryClient.prefetchQuery(getCharactersQueryKey(variables), () =>
    getCharacters(variables)
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Characters() {
  const { isFetching, data } = useGetCharacters();
  if (isFetching) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }
  return (
    <div>
      <div>
        <div>Page</div>
        <div>count: {data.characters.info.count}</div>
        <div>page: {data.characters.info.pages}</div>
        <div>next: {data.characters.info.next ?? 0}</div>
        <div>prev: {data.characters.info.prev ?? 0}</div>
      </div>
      <hr />
      <div>
        {data.characters.results.map((char) => (
          <div key={char.id}>
            <div>name: {char.name}</div>
            <div>created: {char.created}</div>
            <div>species: {char.species}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
