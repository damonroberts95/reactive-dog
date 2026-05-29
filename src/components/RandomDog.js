// Adds a random breed that isn't already in the pack.
export default function RandomDog({ available, onAdd }) {
  function addRandom() {
    if (available.length === 0) {
      alert("Gotta catch 'em all! Your pack is full!");
      return;
    }
    const breed = available[Math.floor(Math.random() * available.length)];
    onAdd(breed);
  }

  return (
    <button
      type="button"
      className="btn btn__primary btn__lg"
      onClick={addRandom}
      disabled={available.length === 0}
    >
      Add a random breed
    </button>
  );
}
