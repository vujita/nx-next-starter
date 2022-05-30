import Link from 'next/link';
import { Anchor, Center, List, ListItem, Text } from '@mantine/core';

export default function RickandmortyIndexPage() {
  return (
    <>
      <Center>
        <Text weight={700}>
          An example of integrating with a{' '}
          <Anchor href="https://rickandmortyapi.com/">3rd party api</Anchor>
        </Text>
      </Center>
      <List>
        <ListItem>
          <Link href="/rickandmorty/characters" passHref>
            <Anchor>Characters</Anchor>
          </Link>
        </ListItem>
      </List>
    </>
  );
}
