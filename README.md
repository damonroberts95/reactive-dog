# DogMatic — Dog Listing App

Search the [dog.ceo](https://dog.ceo/) breed library and build your own pack of
dogs. All images and breeds are credited to dog.ceo — thanks for hosting and
maintaining the pack of dogs and API!

**Live:** https://damonroberts.co.uk/reactive-dog/

## Run locally

```bash
npm install
npm start        # dev server at http://localhost:3000
npm run build    # production build into ./build
```

## Features

- Type to fuzzy-search breeds; add with click or keyboard (↑/↓, Enter).
- Add a random breed in one click.
- No duplicates — already-added breeds drop out of the search and random picker.
- Your pack is saved to `localStorage`, so it survives a page refresh.
- Live count of dogs in your pack.

## Tech

- React 18 + Create React App (`react-scripts` 5)
- [fuse.js](https://fusejs.io/) for fuzzy search
- Deployed to GitHub Pages automatically via GitHub Actions
  (`.github/workflows/deploy.yml`) on every push to `main`.

## History

Originally React 17 / `react-scripts` 4 with `react-select-search`. Modernised:
upgraded React + tooling (fixing the Node 17+ / OpenSSL build break), replaced
the select with a custom accessible combobox (filters as you type, full keyboard
support), added localStorage persistence, image loading/error states, cleaner
naming, and an Actions-based deploy.
