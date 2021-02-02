const gameContainer = document.getElementById("game");

let cardsFlipped = 0;
let cardColor1 = "";
let cardColor2 = "";
let card1 = null;
let card2 = null;
let noClicking = false;


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    
    let index = Math.floor(Math.random() * counter);

    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    
    const newDiv = document.createElement("div");

    
    newDiv.classList.add(color);

    
    newDiv.addEventListener("click", handleCardClick);

    
    gameContainer.append(newDiv);
  }
}




function handleCardClick(event) {
  
  if (noClicking) return;
  if (event.target.classList.contains("flipped")) return;
  

  let currentCard = event.target;
  currentCard.style.backgroundColor = currentCard.classList.value;

  if(!card1 || !card2) {
    currentCard.classList.add("flipped");
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
  } 
  

  if (card1 && card2) {
    noClicking = true;

    if (card1.className === card2.className) {
      cardsFlipped += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      noClicking = false;
    }
    else if (card1.className !== card2.className) {
      setTimeout(function() {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000);
    }
  }

  if (cardsFlipped === COLORS.length) {
    alert("Game Over");
  }
}

createDivsForColors(shuffledColors);