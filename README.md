# DogMatic Dog Listing App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The compiled and built app is avaliable here: https://damonroberts95.github.io/reactive-dog/

To run the development project, clone or download the repo, run `npm install` then `npm start` from a terminal in its directory. 

All images and breeds are credited to [dog.ceo](https://dog.ceo/)! Good job hosting and maintaining their pack of dogs and API.

# Features:
* Dogs can be searched for.
* Dogs already in the pack cannot be added again.
* Adding a random dog also can't create duplicates.
* The dog selection list filters out dogs which have been selected.
* The amount of dogs in the pack are counted.

# Issues:
* Search/Select input isn't great, currently it takes expands fully when clicked. It also doesn't seem to fire onChange until a breed has been clicked on, so typing the name still requires the user to click on the breed they want. 
* Naming conventions could be improved.
* Would be nice to store the state in a cookie so the dogs survive a page refresh.
