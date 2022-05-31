import { CharacterDetailsFragment } from '@myorg/rickandmorty/data-access';
import { Card, Center, Container, Grid, Image, Text } from '@mantine/core';
import { FC } from 'react';
import { format } from 'date-fns';
export type CharacterProps = CharacterDetailsFragment;

const NameValue: FC<{ name: string; value?: string | null }> = ({
  name,
  value = '',
}) => (
  <Grid>
    <Grid.Col sm={12} md={5}>
      <Text weight={700}>{name}:</Text>
    </Grid.Col>
    <Grid.Col sm={12} md={7}>
      <Text lineClamp={1} title={value ?? ''}>
        {value}
      </Text>
    </Grid.Col>
  </Grid>
);
export function Character({
  id,
  name,
  created,
  species,
  image,
}: CharacterProps) {
  return (
    <Card shadow="sm" p="lg" key={id}>
      {image && (
        <Center>
          <Image src={image} alt={name ?? ''} />
        </Center>
      )}
      <Container>
        <NameValue name="Name" value={name} />
        <NameValue
          name="Created"
          value={created ? format(new Date(created), 'MM/dd/yyyy') : ''}
        />
        <NameValue name="Species" value={species} />
      </Container>
    </Card>
  );
}
