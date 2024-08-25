import { useStore } from "../context/store";

export default function List() {
  const { venues } = useStore();
  return (
    <div>
      <h1>Venues</h1>
      <ul>
        {venues.map((venue) => (
          <li key={venue.id}>
            {venue.name} - {venue.city}, {venue.street}
          </li>
        ))}
      </ul>
    </div>
  );
}
