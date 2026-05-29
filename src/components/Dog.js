import { useState, useEffect } from "react";

const API = "https://dog.ceo/api";
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// A single card in the pack: breed name, a random photo, and a remove button.
export default function Dog({ breed, onDelete }) {
  const [src, setSrc] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setSrc(null);
    setFailed(false);
    fetch(`${API}/breed/${breed}/images/random`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => setSrc(data.message))
      .catch((err) => {
        if (err.name !== "AbortError") setFailed(true);
      });
    return () => controller.abort();
  }, [breed]);

  return (
    <li className="dog-card">
      <h3 className="dog-card__title">{cap(breed)}</h3>

      <div className="dog-card__media">
        {src && <img className="dog-card__img" src={src} alt={breed} />}
        {!src && !failed && <span className="dog-card__note">Fetching a good boy…</span>}
        {failed && <span className="dog-card__note">Couldn’t load image</span>}
      </div>

      <button
        type="button"
        className="btn btn__danger"
        onClick={() => onDelete(breed)}
      >
        Remove {cap(breed)}
      </button>
    </li>
  );
}
