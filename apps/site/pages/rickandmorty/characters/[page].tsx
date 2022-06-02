import { Space } from '@mantine/core';
import {
  GetCharactersQueryVariables,
  getCharactersQueryKey,
  getCharacters,
} from '@myorg/rickandmorty/data-access';
import { CharactersGrid } from '@myorg/rickandmorty/ui';
import BreadcrumbsLinks from '../../../components/breadcrumb-links';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from 'react-query';

export default function CharactersPage({ page, name }) {
  const router = useRouter();
  return (
    <>
      <BreadcrumbsLinks
        links={[
          { title: 'Home', href: '/' },
          {
            title: 'Rick & Morty',
            href: '/rickandmorty',
          },
          {
            title: 'Characters',
            href: '/rickandmorty/characters',
          },
          {
            title: `Page ${page}`,
            href: '/rickandmorty/characters',
          },
        ]}
      />
      <Space h={20} />
      <CharactersGrid
        name={name}
        page={page}
        onFilterChange={(newQueryVariables) => {
          const query: Record<string, string | number> = {
            page: newQueryVariables.page,
          };
          for (const filterFieldKey in newQueryVariables.filter) {
            if (newQueryVariables?.filter[filterFieldKey]) {
              query[filterFieldKey] = newQueryVariables?.filter[filterFieldKey];
            }
          }
          router.push({
            pathname: router.pathname,
            query,
          });
        }}
      />
    </>
  );
}
const IS_BROWSER = typeof window !== 'undefined';
CharactersPage.getInitialProps = async ({ query }) => {
  const page = query.page ? Number(query.page) : 1;
  const name = query.name;
  const props: { page: number; name?: string; dehydratedState?: unknown } = {
    page,
    name,
  };
  if (!IS_BROWSER) {
    const queryClient = new QueryClient();
    const variables: GetCharactersQueryVariables = {
      page,
      filter: {
        name,
      },
    };
    await queryClient.prefetchQuery(getCharactersQueryKey(variables), () =>
      getCharacters(variables)
    );
    props.dehydratedState = dehydrate(queryClient);
  }
  return props;
};
