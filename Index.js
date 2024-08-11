const dataurl = "http://www.omdbapi.com/?i=tt3896198&apikey=9808a55d";
const idkurl = "https://api.api-ninjas.com/v1/celebrity?name=Michael Jordan";


function fetchdata(search) {
    return fetch(`http://www.omdbapi.com/?t=${encodeURIComponent(search)}&apikey=9808a55d`)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "False") {
                throw new Error("Movie not found");
            }
            return data;
        });
}


function search() {
    const text = document.querySelector("#movie-search");
    const search = text.value.trim();
    const movieDetailsDiv = document.querySelector("#movie-details");
    if (search === "") {
        text.placeholder = "Enter a movie name";
        return;
    }
    fetchdata(search)
        .then(data => {
            console.log(data)
            const movietitle = data.Title;
            const movieplot = data.Plot;
            const cast = data.Actors;
            const poster = data.Poster;
            document.querySelector("#movie-title").innerHTML = movietitle;
            document.querySelector("#movie-plot").innerHTML = movieplot;
            document.querySelector("#movie-cast").innerHTML = cast;
            document.querySelector("#movie-poster").src = poster;
            document.querySelector("#movie-title").classList.remove('hidden');
            document.querySelector("#movie-plot").classList.remove('hidden');
            document.querySelector("#movie-cast").classList.remove('hidden');
            document.querySelector("#movie-poster").classList.remove('hidden');
            movieDetailsDiv.classList.add('expanded');
        })
        .catch(error => {
            console.log(error.message);
            document.querySelector("#movie-title").classList.add('hidden');
            document.querySelector("#movie-plot").classList.add('hidden');
            document.querySelector("#movie-cast").classList.add('hidden');
            document.querySelector("#movie-poster").classList.add('hidden');
            movieDetailsDiv.classList.remove('expanded');
            text.placeholder = "Movie not found";
        });
}

document.querySelector("#search-button").addEventListener('click', search);
document.querySelector("#movie-search").addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default action (form submission, if any)
        search();
    }
});