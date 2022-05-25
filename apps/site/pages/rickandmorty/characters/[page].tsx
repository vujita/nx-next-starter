import {
  useGetCharacters,
  getCharacters,
  getCharactersQueryKey,
  GetCharactersQueryVariables,
} from '@myorg/rickandmorty/data-access';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from 'react-query';
import Link from 'next/link';
import { useMemo } from 'react';

export async function getServerSideProps({ params }) {
  const queryClient = new QueryClient();
  const variables: GetCharactersQueryVariables = {
    page: Number(params.page ?? 0),
  };
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
  const router = useRouter();
  const page = useMemo(
    () => (router.query.page ? Number(router.query.page) : 0),
    [router.query.page]
  );
  const { isFetching, data } = useGetCharacters({
    page,
  });
  if (isFetching) {
    return '...loading';
  }
  return (
    <div>
      <div>
        {data.characters?.info?.next && (
          <a
            onClick={() => {
              router.push({
                pathname: router.basePath ?? '',
                query: {
                  page: data.characters.info.next,
                },
              });
            }}
          >
            Next
          </a>
        )}
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
