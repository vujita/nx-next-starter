import {
  useGetCharacters,
  getCharacters,
  getCharactersQueryKey,
} from '@myorg/rickandmorty/data-access';
import { dehydrate, QueryClient } from 'react-query';
export async function getStaticProps() {
  const queryClient = new QueryClient();
  const variables = {};
  await queryClient.prefetchQuery(getCharactersQueryKey(variables), () =>
    getCharacters(variables)
  );
  console.log(queryClient);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
export default function Characters() {
  const { isFetching, data } = useGetCharacters();
  if (isFetching) {
    return '...loading';
  }
  return (
    <div>
      <div className="pa2">
        <div>Page</div>
        <div>count: {data.characters.info.count}</div>
        <div>page: {data.characters.info.pages}</div>
        <div>next: {data.characters.info.next ?? 0}</div>
        <div>prev: {data.characters.info.prev ?? 0}</div>
      </div>
      <hr />
      <div>
        {data.characters.results.map((char) => (
          <div key={char.id} className="pa2">
            <div>name: {char.name}</div>
            <div>created: {char.created}</div>
            <div>species: {char.species}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
