import React, { useState, useEffect } from 'react';

export default function Dog(props) {
    var [dogImgSrc, setDogImgSrc] = useState();

    useEffect(() => {
        // GET request using fetch inside useEffect React hook. Gets dog pics using the prop breed.
        var dogImgRequestUrl = 'https://dog.ceo/api/breed/' + props.breed + '/images/random';
        fetch(dogImgRequestUrl)
            .then(response => { return response.json() })
            .then(response => {
                setDogImgSrc(response.message)
                return
            });
    }, [props.breed]); //runs again when breed is updated or changed (which will be never for existing dogs).
    
    return (
        <li className="dog-list stack-small">
            <div className="dog-title">
                {props.breed}
            </div>
            <div>
                <img className="dog-image" src={dogImgSrc} alt={props.breed} />
            </div>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn btn__danger"
                    onClick={() => props.deleteDog(props.breed)}
                >
                    Delete {props.breed}
                </button>
            </div>
        </li>
    );
}