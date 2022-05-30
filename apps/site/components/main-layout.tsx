import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  Anchor,
} from '@mantine/core';
import { useState } from 'react';
import Link from 'next/link';
import NextNProgress from 'nextjs-progressbar';
import { useRouter } from 'next/router';

type SiteLink = {
  href: string;
  text: string;
};
export type MainLayoutProps = React.PropsWithChildren<{
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
];
export default function MainLayout({
  children,
  title = 'Example Application Header',
  siteLinks = defaultSiteLinks,
}: MainLayoutProps) {
  const [opened, setOpened] = useState(false);
  const router = useRouter();

  return (
    <AppShell
      fixed
      padding="md"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          {siteLinks.map((sl) => (
            <Link href={sl.href} key={sl.href} passHref>
              <Anchor href={sl.href} underline={sl.href === router.pathname}>
                {sl.text}
              </Anchor>
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

            <Text>{title}</Text>
          </div>
        </Header>
      }
    >
      <NextNProgress />
      {children}
    </AppShell>
  );
}
