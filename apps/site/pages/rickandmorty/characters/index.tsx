export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/rickandmorty/characters/1',
      permanent: false,
    },
  };
}
export default function CharactersIndex() {
  return null;
}
