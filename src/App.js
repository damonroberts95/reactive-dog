import Dog from "./components/Dog";
import DogSelect from "./components/DogSelect";
import RandomDog from "./components/RandomDog";
import React, { useState, useEffect } from "react";

function App(props) {  

  const [masterDogList, setMasterDogList] = useState();
  const [dogOptions, setDogOptions] = useState([{ 'name': '', 'value': '' }]);
  const [dogs, setDogs] = useState(props.dogs);

  const dogNoun = dogs.length !== 1 ? 'dogs' : 'dog';
  const headingText = `${dogs.length} ${dogNoun} in your pack`;

  useEffect(() => {
    // GET request using fetch inside useEffect React hook. Gets dog pics using the prop breed.
    var masterDogListURL = 'https://dog.ceo/api/breeds/list/all';
    fetch(masterDogListURL)
      .then(response => { return response.json() })
      .then(response => {
        setMasterDogList(Object.keys(response.message))
        return
      })
  }, []); //runs again when breed is updated or changed (which will be never for existing dogs).

  useEffect(() => {
    if (typeof masterDogList !== 'undefined') {
      var arr = [];
      let filteredDogs = arrayFilterByArray(masterDogList, dogs)
      for (var i = 0; i < filteredDogs.length; i++) {
        arr.push({ 'name': filteredDogs[i].charAt(0).toUpperCase() + filteredDogs[i].slice(1), 'value': filteredDogs[i] });
      }
      setDogOptions(arr);
    }
  }, [masterDogList, dogs])

  function deleteDog(breed) {
    const sparedDogs = dogs.filter(dog => breed !== dog.breed);
    setDogs(sparedDogs);
  }

  function addDog(breed) {
    const newDog = { breed: breed };
    setDogs([...dogs, newDog]);
  }

  function arrayFilterByArray(input, criteria) {
    const arr = input.filter(
      function (f) {
        return this.indexOf(f) < 0;
      },
      criteria.map(a => a.breed)
    );
    return arr;
  }

  var dogList = dogs.map(dog => (
    <Dog
      id={dog.breed}
      breed={dog.breed}
      key={dog.breed}
      deleteDog={deleteDog} />
  ));
  return (
    <div className="todoapp stack-large">
      <title>DogMatic</title>
      <h1 className="dogmatic-title">DogMatic</h1>
      <DogSelect
        masterDogList={masterDogList}
        dogOptions={dogOptions}
        addDog={addDog}
        dogs={dogs} />
      <div>
        <RandomDog
          dogs={dogs}
          masterDogList={masterDogList}
          addDog={addDog}
          arrayFilterByArray={arrayFilterByArray}
        />
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {dogList}
      </ul>
    </div>
  );
}

export default App;