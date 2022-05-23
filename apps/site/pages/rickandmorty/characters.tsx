import { useGetCharacters } from '@myorg/rickandmorty/data-access';

export default function Characters() {
  const { isFetching, data } = useGetCharacters();
  if (isFetching) {
    return '...loading';
  }
  return (
    <div>
      <div className="pa2">
        <div>Page</div>
        <div>count: {data.characters.info.count}</div>
        <div>page: {data.characters.info.pages}</div>
        <div>next: {data.characters.info.next ?? 0}</div>
        <div>prev: {data.characters.info.prev ?? 0}</div>
      </div>
      <hr />
      <div>
        {data.characters.results.map((char) => (
          <div key={char.id} className="pa2">
            <div>name: {char.name}</div>
            <div>created: {char.created}</div>
            <div>species: {char.species}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
