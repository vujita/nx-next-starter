import Link from 'next/link';
import {
  Anchor,
  Center,
  Divider,
  Grid,
  List,
  ListItem,
  Space,
  Text,
} from '@mantine/core';

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
          <Anchor href="https://rickandmortyapi.com/documentation/#graphql">
            Show integration with graphql endpoint
          </Anchor>
        </ListItem>
        <ListItem>
          <Anchor href="https://react-query.tanstack.com/">
            Show integration with react-graphql
          </Anchor>
        </ListItem>
      </List>
      <Space h={30} />
      <Divider variant="dashed" labelPosition="center" label="Example Links" />
      <Space h={30} />
      <Grid>
        <Grid.Col>
          <Link href="/rickandmorty/characters" passHref>
            <Anchor>Characters</Anchor>
          </Link>
        </Grid.Col>
      </Grid>
    </>
  );
}
