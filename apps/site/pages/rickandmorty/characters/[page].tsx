import { Space } from '@mantine/core';
import {
  GetCharactersQueryVariables,
  getCharactersQueryKey,
  getCharacters,
  FilterCharacter,
} from '@myorg/rickandmorty/data-access';
import { CharactersGrid } from '@myorg/rickandmorty/ui';
import BreadcrumbsLinks from '../../../components/breadcrumb-links';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from 'react-query';

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
      <CharactersGrid
        name={name}
        gender={gender}
        page={page}
        species={species}
        status={status}
        type={type}
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
    await queryClient.prefetchQuery(getCharactersQueryKey(variables), () =>
      getCharacters(variables)
    );
    props.dehydratedState = dehydrate(queryClient);
  }
  return props;
};
