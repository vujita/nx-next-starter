import Link from 'next/link';

export default function RickandmortyIndexPage() {
  return (
    <div>
      <h1>Welcome to Rickandmorty!</h1>
      <Link href="/rickandmorty/characters">Characters</Link>
    </div>
  );
}
