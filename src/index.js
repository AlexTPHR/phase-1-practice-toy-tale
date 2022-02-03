let addToy = false;
let toyCollectionDiv = document.querySelector("div#toy-collection")
let toyForm = document.querySelector(".add-toy-form")
fetch("http://localhost:3000/toys")
.then(res => res.json())
.then(function(toysArr){
  toysArr.forEach(function(toyObj){
    turnToyToCard(toyObj)
  })
})

// {} -> <HTML EventListeners/>
function turnToyToCard(toy){
  let toyCardDiv = document.createElement("div")
    toyCardDiv.className = "card"

  let toyNameH2 = document.createElement("h2")
    toyNameH2.innerText = toy.name
    
  let toyImage = document.createElement("img")
    toyImage.src = toy.image
    toyImage.className = "toy-avatar"
    toyImage.alt = toy.name
    // alt is what loads if the picture does not load
  
  let likesP = document.createElement("p")
    likesP.innerText = `${toy.likes} Likes`

  let likeButton = document.createElement("button")
    likeButton.className = "like-btn"
    likeButton.innerText = "like <3"

  toyCardDiv.append(toyNameH2, toyImage, likesP, likeButton)
  toyCollectionDiv.append(toyCardDiv)

likeButton.addEventListener("click", function(evt){
  
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      likes: toy.likes + 1
  })
})
  .then(res => res.json())
  .then(function(updatedToyObj){
    toy.likes = updatedToyObj.likes

    likesP.innerText = `${updatedToyObj.likes} Likes`
  })
})//likeButton eventListener ends here
} //turnToyToCard ends here

//stable element event listener on global level
// rare for you to do this inside another event listener
toyForm.addEventListener("submit", function(e){
  e.preventDefault()
  let newName = e.target.name.value
  let newImage = e.target.image.value

  fetch("http://localhost:3000/toys/", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: newName,
      image: newImage,
      likes: 0
    }),
  })
  .then(res => res.json())
  .then(function(newToy){
    turnToyToCard(newToy)
  })
})

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
