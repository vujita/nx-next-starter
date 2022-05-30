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

export default function CharactersPage({ page }) {
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
        page={page}
        onPageChange={(newPage) => {
          router.push({
            pathname: router.pathname,
            query: {
              page: newPage,
            },
          });
        }}
      />
    </>
  );
}
const IS_BROWSER = typeof window !== 'undefined';
CharactersPage.getInitialProps = async ({ query }) => {
  const page = query.page ? Number(query.page) : 1;
  const props: { page: number; dehydratedState?: unknown } = {
    page,
  };
  if (!IS_BROWSER) {
    const queryClient = new QueryClient();
    const variables: GetCharactersQueryVariables = {
      page,
    };
    await queryClient.prefetchQuery(getCharactersQueryKey(variables), () =>
      getCharacters(variables)
    );
    props.dehydratedState = dehydrate(queryClient);
  }
  return props;
};
