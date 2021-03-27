import React from "react";

/* Passed in:
        dogs={dogs} 
        masterDogList={masterDogList} 
        addDog={addDog}*/

function RandomDog(props) {

    function handleRandomSubmit(e) {
        e.preventDefault(); 
        let filteredDogs = props.arrayFilterByArray(props.masterDogList, props.dogs)
        if(filteredDogs.length === 0)
        {
            alert('Gotta catch \'em all! Your pack full!')
            return;
        }
        let randomDog = filteredDogs[Math.floor(Math.random() * filteredDogs.length)];
        console.log(randomDog);
        props.addDog(randomDog)
    }

    return (
        <div className="random-dog">
            <button type="button"
                className="btn btn__primary btn__lg"
                aria-pressed="true"
                onClick={handleRandomSubmit}>
                <span className="visually-hidden">Show </span>
                <span>Add a random breed</span>
                <span className="visually-hidden"> tasks</span>
            </button>
        </div>
    );
}

export default RandomDog;