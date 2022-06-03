import { CharacterDetailsFragment } from '@myorg/rickandmorty/data-access';
import { Card, Center, Container, Grid, Image, Text } from '@mantine/core';
import React, { FC } from 'react';
import { format } from 'date-fns';
export type CharacterProps = CharacterDetailsFragment;

type CharacterKey = keyof CharacterDetailsFragment;
const NameValue: FC<{ name: string; value?: string | null }> = ({
  name,
  value = '',
}) => (
  <Grid>
    <Grid.Col sm={12} md={5}>
      <Text weight={700} transform="capitalize">
        {name}:
      </Text>
    </Grid.Col>
    <Grid.Col sm={12} md={7}>
      <Text lineClamp={1} title={value ?? ''}>
        {value}
      </Text>
    </Grid.Col>
  </Grid>
);
type CharNameValueProp = {
  attr: CharacterKey;
  label?: string;
  char: CharacterDetailsFragment;
  formatter?: (char: CharacterDetailsFragment) => string | undefined;
};
const CharNameValue: FC<CharNameValueProp> = ({
  attr,
  label,
  char,
  formatter,
}) => {
  return (
    <NameValue
      name={label ?? attr}
      value={formatter ? formatter(char) : (char[attr] as string | undefined)}
    />
  );
};
type AtrributeCmp = Omit<CharNameValueProp, 'char'>;
const attributeMap: AtrributeCmp[] = [
  { attr: 'name' },
  {
    attr: 'created',
    formatter: (char) => {
      return char.created ? format(new Date(char.created), 'MM/dd/yyyy') : '';
    },
  },
  { attr: 'status' },
  { attr: 'type', formatter: (char) => char.type || '---' },
  { attr: 'species' },
  { attr: 'gender' },
];
export function Character(character: CharacterProps) {
  return (
    <Card shadow="sm" p="lg" key={character.id}>
      {character.image && (
        <Center>
          <Image src={character.image} alt={character.name ?? ''} />
        </Center>
      )}
      <Container>
        {attributeMap.map((attrCfg, i) => {
          return (
            <CharNameValue
              key={`${attrCfg}-${i}`}
              {...attrCfg}
              char={character}
            />
          );
        })}
      </Container>
    </Card>
  );
}
