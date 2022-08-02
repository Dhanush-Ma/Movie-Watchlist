const filmDisplay = document.getElementById("film-list")
let filmsID = []

for(let i=0; i<localStorage.length; i++)
    {
        document.getElementById("film-list").innerHTML = ""
        let keyname = localStorage.key(i)
        let id = JSON.parse(localStorage.getItem(keyname))
        filmsID.push(id)
    }

filmsFromLocalStorage()

async function filmsFromLocalStorage()
{
    for(let i=0; i<filmsID.length; i++)
    {
        let id = filmsID[i]
        const res = await  fetch(`https://www.omdbapi.com/?apikey=69005b96&i=${id}`)
        const data = await res.json()
        updateFilm(data)
        removeFromWatchlist()

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
                        
    filmDisplay.innerHTML += `
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
                    <div class="btn-flex"> 
                    <button class="watchlist-btn"><img src="icons/icon-2.png" alt=""></button>
                    <p>Remove</p>
                    </div>
                </div>
                <div class="flex">
                    <p id="movie-desc">${plot}</p>
                </div>
          </div>
    </div>`
}

function removeFromWatchlist()
{
    const watchlistElements = document.querySelectorAll(".watchlist-btn")
    for(let i=0; i<watchlistElements.length; i++)
    {
        watchlistElements.item(i).addEventListener("click", event => {
            let currentFilmID = filmsID[i]
            localStorage.removeItem(JSON.stringify(currentFilmID))
            location.reload()
        })
    }
}

// watchlist page script only
