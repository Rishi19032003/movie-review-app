const APILINK = 'https://www.omdbapi.com/?s=Batman%202&apikey=629c9c37'
const IMG_PATH = 'https://th.bing.com/th?id=OIP.DAuF8ksdA5Kjh7fLifDpnwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2'
const SEARCHAPI = "https://www.omdbapi.com/?s="
const APIKEY = "&apikey=629c9c37"

const main = document.getElementById('section')
const form = document.getElementById('form')
const search = document.getElementById('query')

returnMovies(APILINK)

function returnMovies(url){
    fetch(url)
    .then(res => res.json())
    .then((data) => {
        console.log(data)
        data.Search.forEach(element => {
            const div_card = document.createElement("div")
            div_card.setAttribute('class', 'card')

            const div_row = document.createElement("div")
            div_row.setAttribute('class', 'row')

            const div_column = document.createElement("div")
            div_column.setAttribute('class', 'column')

            const image = document.createElement("img")
            image.setAttribute('class', 'thumbnail')
            image.setAttribute('id', 'image')

            const title = document.createElement("h3")
            title.setAttribute('id', 'title')

            const center = document.createElement("center")

            image.src = (element.Poster !== "N/A" && element.Poster !== "") ? `${element.Poster}` : IMG_PATH;

            title.innerHTML = `${element.Title}<br><a href="movie.html?id=${element.imdbID}&title=${element.Title}">reviews</a>`

            center.appendChild(image)
            div_card.appendChild(center)
            div_card.appendChild(title)
            div_column.appendChild(div_card)
            div_row.appendChild(div_column)
            main.appendChild(div_row)
        });
    })
    .catch(error => {
        main.innerHTML = '<h1>Movie Not Found</h1>'
        main.style.color = 'white'
    });
}

form.addEventListener('submit',(e) => {
    e.preventDefault()
    main.innerHTML = ''

    const searchItem = search.value
    if(searchItem){
        returnMovies(SEARCHAPI + searchItem + APIKEY)
        search.value = ""
    }

})