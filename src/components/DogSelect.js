import React, { useState } from 'react';
import SelectSearch from 'react-select-search';
import fuzzySearch  from '../fuzzySearch.js';

/* Passed in:
        masterDogList={masterDogList}
        dogOptions={dogOptions}
        addDog={addDog}
        dogs={dogs} />*/

function DogSelect(props) {

  var [newDog, setNewDog] = useState('');

  function handleSubmit(e) {
    e.preventDefault();    
    if (!props.masterDogList.includes(newDog)) {
      alert("Paw0Paw error: Dog not found!");
      return;
    }
    else if ((props.dogs.map(a => a.breed)).includes(newDog)) {
      alert("Paw0Paw error: Dog already found!");
      setNewDog("");
      return;
    }
    else {
    props.addDog(newDog);
    setNewDog("");
    return;
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          Dog
            <br /><br />
            A domesticated carnivorous mammal that typically has a long snout, an acute sense of smell, non-retractable claws, and a barking, howling, or whining voice.
            <br /><br />
            Search for and pick your favourites below. {newDog}
          </label>
      </h2>
      <SelectSearch
        id="dogsearch"
        options={props.dogOptions}
        search
        filterOptions={fuzzySearch}
        value={newDog}
        className="input__lg capitalize"
        onChange={setNewDog}
        placeholder="Choose a dog"
        emptyMessage="Not found"
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add dog
        </button>
    </form>
  );
}

export default DogSelect;