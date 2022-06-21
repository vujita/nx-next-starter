import { Space } from '@mantine/core';
import {
  FilterCharacter,
  GetCharactersQueryVariables,
  serverGqlClient,
} from '@myorg/rickandmorty/data-access';
import { CharactersGrid, CharactersGridProps } from '@myorg/rickandmorty/ui';
import BreadcrumbsLinks from '../../../components/breadcrumb-links';
import { useRouter } from 'next/router';
import { QueryClient, dehydrate } from 'react-query';
import { useCallback, useMemo } from 'react';

type CharactersPageProps = FilterCharacter & { page: number };
export default function CharactersPage({
  page,
  name,
  gender,
  species,
  type,
  status,
}: CharactersPageProps) {
  const router = useRouter();
  const initVars = useMemo<CharactersGridProps['initVars']>(
    () => ({
      page,
      filter: {
        name,
        gender,
        species,
        type,
        status,
      },
    }),
    [gender, name, page, species, status, type]
  );
  const onFilterChange = useCallback<CharactersGridProps['onFilterChange']>(
    (newQueryVariables) => {
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
    },
    [router]
  );
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
            href: `/rickandmorty/characters/${page}`,
          },
        ]}
      />
      <Space h={20} />
      <CharactersGrid initVars={initVars} onFilterChange={onFilterChange} />
    </>
  );
}
const IS_BROWSER = typeof window !== 'undefined';
CharactersPage.getInitialProps = async ({ query }) => {
  const page = query.page ? Number(query.page) : 1;
  const name = query.name;
  const gender = query.gender;
  const type = query.type;
  const status = query.status;
  const species = query.species;
  const props: CharactersPageProps & {
    dehydratedState?: unknown;
  } = {
    page,
    gender,
    name,
    type,
    status,
    species,
  };
  if (!IS_BROWSER) {
    // SSR Data fetching
    const queryClient = new QueryClient();
    const variables: GetCharactersQueryVariables = {
      page,
      filter: {
        gender,
        name,
        type,
        status,
        species,
      },
    };
    await queryClient.prefetchQuery(
      variables === undefined ? 'getCharacters' : ['getCharacters', variables],
      () => serverGqlClient.getCharacters(variables)
    );
    props.dehydratedState = dehydrate(queryClient);
  }
  return props;
};
