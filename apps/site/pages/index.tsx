import { Center, Text, List, ListItem, Anchor } from '@mantine/core';
export default function Index() {
  return (
    <>
      <Center>
        <Text weight={700}>A placeholder for App home page</Text>
      </Center>
      <Text>Tech choices</Text>
      <List>
        <ListItem>
          <Anchor href="https://nextjs.org/">NextJS</Anchor>
          <List withPadding>
            <ListItem>
              <Anchor href="https://nextjs.org/docs/basic-features/pages#server-side-rendering">
                Server side rendering
              </Anchor>
            </ListItem>
            <ListItem>
              <Anchor href="https://nextjs.org/docs/routing/introduction">
                File system based routing
              </Anchor>
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Anchor href="https://react-query.tanstack.com/">react-query</Anchor>
          <List withPadding>
            <ListItem>
              <Anchor href="https://react-query.tanstack.com/guides/caching">
                Data fetching with out of the box caching
              </Anchor>
            </ListItem>
            <ListItem>
              <Anchor href="https://react-query.tanstack.com/guides/ssr">
                SSR support with NextJs
              </Anchor>
            </ListItem>
            <ListItem>
              <Anchor href="https://www.graphql-code-generator.com/">
                Graphql Code Generator Intergration
              </Anchor>
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Anchor href="https://mantine.dev/">mantime</Anchor>
          <List withPadding>
            <ListItem>Theme supported component library</ListItem>
          </List>
        </ListItem>
      </List>
    </>
  );
}
