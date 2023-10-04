const gameContainer = document.getElementById("game");
const clickedCards = {};
let i = 1;


const checkDucks = [
   "mallard",
  "wood-duck",
  "mandorin-duck",
  "canada-goose",
  "white-duck"
]
const DUCKS = [
  "mallard",
  "wood-duck",
  "mandorin-duck",
  "canada-goose",
  "white-duck",
  "mallard",
  "wood-duck",
  "mandorin-duck",
  "canada-goose",
  "white-duck"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  // console.log(array);
  return array;
}

let shuffledDucks = shuffle(DUCKS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForDucks(duckArray) {
  for (let ducks of duckArray) {
    // create a new div
    const newDiv = document.createElement("div");
    const secondNewDiv = document.createElement("div");
    const thirdNewDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(ducks);
    newDiv.classList.add('inner');
    newDiv.appendChild(secondNewDiv);
    secondNewDiv.classList.add('front');
    newDiv.appendChild(thirdNewDiv);
    thirdNewDiv.classList.add('back');
    thirdNewDiv.classList.add(`${ducks}2`);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
    let length = Object.values(clickedCards).length;
    let targetCard = event.target;
    let duckType = targetCard.parentNode.classList[0];
    targetCard.parentNode.classList.toggle("flipCard");
    clickedCards[i] = duckType;
    i++;
    let flipped = document.querySelectorAll(".flipCard");
    let card1 = flipped[0];
    let card2 = flipped[1];
      
  if (length < 1) {
        localStorage.setItem('firstClick', duckType);
        card1.removeEventListener("click", handleCardClick)
      }
      else if (length = 1) {
        removeAllEventListeners();
        let firstDuck = localStorage.getItem('firstClick');
        
        if (firstDuck != duckType) {
          console.log('No match, try again!');
          setTimeout(flipBack, 1000);
          // setTimeout(addAllEventListeners(), 500);
        }
        
        else if (firstDuck = duckType) {
          card1.classList.add("prevent");
          // card1.removeEventListener("click", handleCardClick);
          card1.classList.remove("flipCard");
          card2.classList.add("prevent");
          // card2.removeEventListener("click", handleCardClick);
          card2.classList.remove("flipCard");
          for (var clear in clickedCards) {
            delete clickedCards[clear];
          }
          addAllEventListeners()
        }
      }
    
    //  console.log("you just clicked", event.target);
  
}


// when the DOM loads
createDivsForDucks(shuffledDucks);

function flipBack() {
    let flipped = document.querySelectorAll(".flipCard");
    let card1 = flipped[0];
    let card2 = flipped[1];
        card1.classList.remove("flipCard");
        card2.classList.remove("flipCard");
  for (var clear in clickedCards) {
    delete clickedCards[clear];
  }
  addAllEventListeners()
}

function removeAllEventListeners() {
  let all = document.querySelectorAll(".inner");
  for (let p = 0; p < all.length; p++) {
    all[p].removeEventListener("click", handleCardClick);
  }
}

function addAllEventListeners() {
  let all = document.querySelectorAll(".inner:not(.prevent)");
  for (let p = 0; p < all.length; p++) {
    if(all[p])
    all[p].addEventListener("click", handleCardClick);
  }
}
