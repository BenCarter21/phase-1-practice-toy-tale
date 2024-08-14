let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// Assignment starts here

// First Assignment Section

document.addEventListener("DOMContentLoaded", (e) => {
  fetch("http://localhost:3000/toys")
  .then(function (response) {
      return response.json();
    })
    .then(toys => toys.forEach(toy => createCard(toy)))
})

function createCard(toy){
  // grabbing location for the cards
  let cardDiv = document.getElementById("toy-collection")
  
  //creating the card
  let newCard = document.createElement("div")
  
// Step A in createCard function
  // (1) creatingthe h2 for the toy name
  let newH2 = document.createElement("h2")
  
  // (2) populate card w/ toy name
  newH2.textContent = toy.name
  
  // (3) populate new card with the h2
  newCard.append(newH2)
  
// Step B in createCard function
  // (1) creating image for the card
  let newImage = document.createElement("img")

  // (2) sourcing image from the object
  newImage.src = toy.image

  // (3) adding image to the card
  newCard.append(newImage)
  
// Step C in createCard function 
  // (1) creating likes for each card
  let newLikes = document.createElement("p")

  // (2) sourcing number of likes from the object
  newLikes.textContent = toy.likes
  newLikes.id = toy.id
  // (3) adding image to the card
  newCard.append(newLikes)

// Step D in createCard function
  // (1) creating card button 
  let newButton = document.createElement("button")
  
  // (2) Populating button with toy ID number from the server
  newButton.textContent = toy.id
  
  // (3) attaching the button to the card
  let newNumberOfLikes = toy.likes
  
  newCard.append(newButton)
//last step is populating the DOM with all of the new cards
  cardDiv.append(newCard)

  newButton.addEventListener("click", (e) => {
    console.log(newLikes)
    newNumberOfLikes++
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": newNumberOfLikes
  })
  })
  .then(function (response) {
    return response.json();
  })
  .then(function (updatedToy) {
    newLikes.textContent = updatedToy.likes
  })
})
//Step E in createCard function 
  
  // adding class list identifiers to newly created DOM elements
  newCard.classList.add("card")
  newImage.classList.add("toy-avatar")
  newButton.classList.add("like-btn")
}

// Second Assignment Segment 

// A POST request should be sent to http://localhost:3000/toys 
// and the new toy added to Andy's Toy Collection.

document.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch("http://localhost:3000/toys/", {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
    }, 
    body: JSON.stringify({
      "name": "Sammie",
      "image": "https://images.app.goo.gl/t9Tz41zaJ9wfdtKe9",
      "likes": 0
})
})
.then(function (response) {
    return response.json();
  })
  .then(function (newToy) {
    createCard(newToy)
  })
})

// Increasing a toys number of likes
// A patch request (i.e., method: "PATCH") should be sent to the server at 
// http://localhost:3000/toys/:id, updating the number of likes that toy has
//  the toy's like count should be updated in the DOM without reloading the page


// const card = document.getElementsByClassName("card")
// card.getElementsByClassName(".like-btn").addEventListener("click", (e) => {
//   console.log("click")})


// const cards = document.getElementsByClassName("card");
// const likeButtons = document.getElementsByClassName("like-btn");
