import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
} from '@mantine/core';
import { useState } from 'react';
import Link from 'next/link';

type SiteLink = {
  href: string;
  text: string;
};
type Props = React.PropsWithChildren<{
  title?: string;
  siteLinks?: SiteLink[];
}>;
const defaultSiteLinks: SiteLink[] = [
  {
    href: '/',
    text: 'Home',
  },
  {
    href: '/rickandmorty',
    text: 'Rick & Morty',
  },
  {
    href: '/rickandmorty/characters',
    text: 'Rick & Morty Characters',
  },
];
export default function MainLayout({
  children,
  siteLinks = defaultSiteLinks,
}: Props) {
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          {siteLinks.map((sl) => (
            <Link href={sl.href} key={sl.href}>
              {sl.text}
            </Link>
          ))}
        </Navbar>
      }
      header={
        <Header height={70} p="md">
          <div
            style={{ display: 'flex', alignItems: 'center', height: '100%' }}
          >
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                mr="xl"
              />
            </MediaQuery>

            <Text>Application header</Text>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
