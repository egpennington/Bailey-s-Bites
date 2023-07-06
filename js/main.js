import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://play-ground-ce58e-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const moviesInDB = ref(database, "movies")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const movieListEl = document.getElementById("movie-list")

onValue(moviesInDB, function(snapshot) {

  if (snapshot.exists()) {
    let moviesArray = Object.entries(snapshot.val())
    moviesArray.reverse()
    clearMovieListEl()
    
    for (let i = 0; i < moviesArray.length; i++) {
      let currentMovie = moviesArray[i]   
      let currentMovieID = currentMovie[0]
      let currentMovieValue = currentMovie[1]
      
      appendMovieListEl(currentMovie)
    }
    
  } else {
    movieListEl.innerHTML = "No items here... yet"
  }
})  

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value    
    clearMovieListEl()
    push(moviesInDB, inputValue)
    clearInput()
})

function clearInput() {
   inputFieldEl.value = ""
}

function clearMovieListEl() {
    movieListEl.innerHTML = ""
}

function appendMovieListEl(movie) {
   
   let movieID = movie[0]
   let movieValue = movie[1]
   
   let newEl = document.createElement("li")
      
   newEl.textContent = movieValue
   
   newEl.addEventListener("click", function() {
       let exactLocationOfItemInDB = ref(database, `movies/${movieID}`)
       
       remove(exactLocationOfItemInDB)
   })
   
   movieListEl.append(newEl)
}