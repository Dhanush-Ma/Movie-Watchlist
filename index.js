const searchEl = document.getElementById("search-btn")
const inputEl = document.getElementById("query")
let filmsID = []
let sample = []
let title 
let runTime                 
let genre                
let plot                
let rating 
let image


inputEl.addEventListener("keypress", function(e){
    if(e.key === 'Enter')
    {
        search()
    }
})
searchEl.addEventListener("click", search)


async function search()
{
    const userTitle = inputEl.value
    if(userTitle)
    {
        const res = await fetch(`https://www.omdbapi.com/?apikey=69005b96&s=${userTitle}`)
        const data = await res.json()
                console.log(data)
                document.getElementById("film-list").innerHTML = ""
                if(data.Search)
                {
                    filmsID = data.Search.map(function(item)
                    {
                        return item.imdbID
                    })

                    for(let i=0; i<filmsID.length; i++)
                    {
                        let id = filmsID[i]
                        const res =await fetch(`https://www.omdbapi.com/?apikey=69005b96&i=${id}`)
                        const data = await res.json()
                        updateFilm(data)
                        watchlist(data)
                    }
                }
                
                else
                {
                    document.getElementById("film-list").innerHTML = `  <div class="initial-text">
                    <h2>Unable to find what you're looking for. Please try another search.</h2>
                    </div>`
                }
        }
}    

function updateFilm(movie){
        let {Title,Runtime,Genre,Plot,imdbRating,Poster} = movie
        title = Title
        runTime = Runtime
        genre = Genre
        plot = Plot
        rating = imdbRating
        image = Poster

    document.getElementById("film-list").innerHTML += `
    <div class="movie">
          <img id="movie-poster" src="${image}" alt="${title}movie poster">
          <div class="movie-info">
             <div class="flex">
                <h3 id="movie-title">${title}</h3>
                <p id="movie-rating">⭐ ${rating}</p>
            </div>
            <div class="flex flex-2">
                <p id="movie-duration">${runTime}</p>
                <p id="movie-genre">${genre}</p>
                <div id="${movie.imdbID}" class="btn-flex"> 
                    <button class="watchlist-btn"><img src="icons/icon-1.png" alt=""></button>
                    <p>Watchlist</p>
                </div>
            </div>
            <div class="flex">
                <p id="movie-desc">${plot}</p>
            </div>
          </div>
    </div>`
}

function watchlist(data){
    const watchlistElements = document.querySelectorAll(".watchlist-btn")
    for(let i=0; i<watchlistElements.length; i++)
    {
        watchlistElements.item(i).addEventListener("click", event => {
            let currentFilmID = filmsID[i]
            console.log(filmsID.indexOf(currentFilmID))
            localStorage.setItem(JSON.stringify(currentFilmID),JSON.stringify(currentFilmID))
            console.log(document.querySelector(`#${currentFilmID}`).innerHTML)
            document.querySelector(`#${currentFilmID}`).innerHTML = `<button id=${currentFilmID} class="watchlist-btn" disabled><i class="fa fa-check" aria-hidden="true"></i></button>
            <p style="color:green;font-weight:bold">Added</p>`
            // localStorage.clear()
        })
    }
}



/* 

console.log(filmsID)
filmsID.map(function(id){
console.log(id)
fetch(`http://www.omdbapi.com/?apikey=69005b96&i=${id}`)
.then(res => res.json())
.then(data => {
console.log(filmsID.indexOf(id))
updateFilm(data)
watchlist(data)
})
})

filmsID.map(function(id){
fetch(`http://www.omdbapi.com/?apikey=69005b96&i=${id}`)
.then(res => res.json())
.then(data => {
console.log(filmsID.indexOf(id))
updateFilm(data)
removeFromWatchlist()
})
})
}*/

// index page script only
