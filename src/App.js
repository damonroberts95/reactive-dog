import { useState, useEffect, useMemo } from "react";
import Dog from "./components/Dog";
import DogSearch from "./components/DogSearch";
import RandomDog from "./components/RandomDog";

const API = "https://dog.ceo/api";
const STORAGE_KEY = "dogmatic.pack";

// Load the saved pack (a list of breed names) from localStorage.
function loadPack() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved)) return saved.filter((b) => typeof b === "string");
  } catch {
    // ignore malformed storage
  }
  return [];
}

export default function App() {
  const [pack, setPack] = useState(loadPack);     // breeds the user has added
  const [allBreeds, setAllBreeds] = useState([]); // master list from the API
  const [error, setError] = useState(null);

  // Fetch the master breed list once on mount.
  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API}/breeds/list/all`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => setAllBreeds(Object.keys(data.message)))
      .catch((err) => {
        if (err.name !== "AbortError") setError("Couldn't load the breed list. Try refreshing.");
      });
    return () => controller.abort();
  }, []);

  // Persist the pack whenever it changes, so it survives a refresh.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pack));
  }, [pack]);

  // Breeds not yet in the pack — what the search + random picker can offer.
  const available = useMemo(
    () => allBreeds.filter((breed) => !pack.includes(breed)),
    [allBreeds, pack]
  );

  function addDog(breed) {
    setPack((prev) => (prev.includes(breed) ? prev : [...prev, breed]));
  }

  function removeDog(breed) {
    setPack((prev) => prev.filter((b) => b !== breed));
  }

  const noun = pack.length === 1 ? "dog" : "dogs";

  return (
    <main className="dogmatic">
      <h1 className="dogmatic__title">DogMatic</h1>
      <p className="dogmatic__intro">
        Search the dog.ceo breed library and build your pack. Pick a favourite or
        add a random breed — no duplicates allowed.
      </p>

      {error && <p className="dogmatic__error" role="alert">{error}</p>}

      <div className="dogmatic__controls">
        <DogSearch options={available} onAdd={addDog} />
        <RandomDog available={available} onAdd={addDog} />
      </div>

      <h2 id="list-heading" className="dogmatic__count">
        {pack.length} {noun} in your pack
      </h2>

      <ul className="pack" aria-labelledby="list-heading">
        {pack.map((breed) => (
          <Dog key={breed} breed={breed} onDelete={removeDog} />
        ))}
      </ul>
    </main>
  );
}
