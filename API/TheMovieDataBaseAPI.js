//import API_TOKEN from '../Helpers/token';
//key API(v3 auth)
const API_TOKEN = "4336d5ada30b10dc332f193721ba4a50"
//https://www.themoviedb.org/

export const getFilmsFromApiWithSearchedText = (text, page) => {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + "&page=" + page;
    return fetch(url)
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((error) => console.log(error))
}

export function getImageFromApi(name) {
    return 'https://image.tmdb.org/t/p/w300' + name
}