import { useMemo, useState, useRef, useEffect } from "react";
import Fuse from "fuse.js";

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const MAX_RESULTS = 8;

/*
  Accessible combobox for picking a breed.

  Fixes the old react-select-search problems:
    - filters as you type (no need to click first)
    - keyboard support: ↑/↓ to move, Enter to add, Esc to close
    - click (or tap) an option to add it
    - the list stays a compact dropdown instead of expanding fully
*/
export default function DogSearch({ options, onAdd }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0); // highlighted option index
  const boxRef = useRef(null);

  // Rebuild the fuzzy matcher only when the available breeds change.
  const fuse = useMemo(() => new Fuse(options, { threshold: 0.4 }), [options]);

  const matches = useMemo(() => {
    const q = query.trim();
    if (!q) return options.slice(0, MAX_RESULTS);
    return fuse.search(q).map((r) => r.item).slice(0, MAX_RESULTS);
  }, [query, options, fuse]);

  // Close the dropdown when clicking outside the component.
  useEffect(() => {
    function onClickOutside(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function choose(breed) {
    onAdd(breed);
    setQuery("");
    setOpen(false);
    setActive(0);
  }

  function onKeyDown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(a + 1, matches.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (matches[active]) choose(matches[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div className="dog-search" ref={boxRef}>
      <label htmlFor="dog-search-input" className="dog-search__label">
        Find a breed
      </label>
      <input
        id="dog-search-input"
        className="dog-search__input"
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls="dog-search-list"
        aria-autocomplete="list"
        autoComplete="off"
        placeholder="Start typing… e.g. husky"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setActive(0);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
      />
      {open && matches.length > 0 && (
        <ul id="dog-search-list" className="dog-search__list" role="listbox">
          {matches.map((breed, i) => (
            <li
              key={breed}
              role="option"
              aria-selected={i === active}
              className={"dog-search__option" + (i === active ? " is-active" : "")}
              onMouseEnter={() => setActive(i)}
              // onMouseDown (not onClick) so it fires before the input blurs
              onMouseDown={(e) => {
                e.preventDefault();
                choose(breed);
              }}
            >
              {cap(breed)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
