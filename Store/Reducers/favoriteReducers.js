const initialState = { favoritesFilm: [] }

//reducer that has only one action - TOGGLE_FAVORITE
toggleFavorite = (state = initialState, action) => {
    let nextState
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            //la fonction  findIndex  en Javascript retourne l'index de l'élément dans le tableau s'il existe, sinon elle renvoie -1.
            //on fait passer l'objet d'une action (ici notre film) dans le champ value (d'où le code  action.value )
            const favoriteFilmIndex = state.favoritesFilm.findIndex(item => item.id === action.value.id)
            if (favoriteFilmIndex !== -1) {
                //supression - Le film est déjà dans les favoris, on le supprime de la liste
                nextState = {
                    ...state,
                    favoritesFilm: state.favoritesFilm.filter( (item, index) => index !== favoriteFilmIndex)
                }
            }
            else {
                //ajouter - Le film n'est pas dans les films favoris, on l'ajoute à la liste
                nextState = {
                    //create copy of state
                    ...state,
                    //add film(action.value) to copy of state
                    favoritesFilm: [...state.favoritesFilm, action.value]
                }
            }
            return nextState || state

        default:
            return state;
    }
}

export default toggleFavorite;