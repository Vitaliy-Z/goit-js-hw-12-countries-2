export default function fetchCountries(search) {
  return fetch(`https://restcountries.eu/rest/v2/name/${search}`).then((r) =>
    r.json()
  );
}
