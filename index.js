const Btn = document.querySelector('.btn')
const Movie = document.getElementById('movie-container')

Btn.addEventListener('click', e =>{
    e.preventDefault()
    const SearchBox = document.getElementById('search').value
    fetch(`https://www.omdbapi.com/?apikey=bbc5e59f&s=${SearchBox}`)
    .then(res => res.json())
    .then(data => {
        // console.log(data.Search[0].filmPoster)
        const lenth = data.Search.length
        for(let i=0;i<lenth;i++){
            let filmTitle = data.Search[i].Title
            let filmImdbID = data.Search[i].imdbID
            let filmPoster = data.Search[i].Poster
            let filmGenre
            let filmRuntime
            let filmPlot
            let filmRating
            Movie.innerHTML = ``
            fetch(`https://www.omdbapi.com/?apikey=bbc5e59f&i=${filmImdbID}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                filmGenre = data.Genre
                filmRuntime = data.Runtime
                filmPlot = data.Plot
                filmRating = data.Ratings[0].Value

                const dataObj = {
                    filmTitle: filmTitle,
                    filmPoster: filmPoster,
                    filmGenre: filmGenre,
                    filmRuntime: filmRuntime,
                    filmPlot: filmPlot,
                    filmRating: filmRating
                }
                //   console.log(filmPoster)
                Movie.innerHTML += `
          <div class="movie">
                <div class="img-container">
                  <img src="${dataObj.filmPoster}" alt="movie" class="movie-img">
                </div>
            <div class="info-container">
                <div class="flex-1">
                    <h2 class="m-name">${dataObj.filmTitle}</h2>
                    <p class="rating">${dataObj.filmRating}</p>
                </div>
                <div class="flex-2">
                    <p class="m-time">${dataObj.filmRuntime}</p>
                    <p class="genre">${dataObj.filmGenre}</p>
                    <p class="watch-list">watchlist</p>
                </div>
                <p class="info">${dataObj.filmPlot}</p>
            </div>
         </div>
                <hr>
                `
            })
        }
        
    })
    
})