import { Breadcrumbs, Anchor } from '@mantine/core';
import Link from 'next/link';
import { FC } from 'react';

export type BreadcrumbLink = {
  title: string;
  href: string;
};
const BreadcrumbsLinks: FC<{ links: BreadcrumbLink[] }> = ({ links }) => (
  <Breadcrumbs separator="→">
    {links.map((l) => (
      <Link key={l.href} href={l.href} passHref>
        <Anchor href={l.href}>{l.title}</Anchor>
      </Link>
    ))}
  </Breadcrumbs>
);
export default BreadcrumbsLinks;
