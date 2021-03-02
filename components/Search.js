import React, { Component } from 'react';
import {
  View, Button,
  TextInput, StyleSheet,
  FlatList, ActivityIndicator
} from 'react-native';
import FilmItem from './FilmItem';
import { connect } from 'react-redux';

//import films from '../Helpers/filmsData';   //this.state.films is used from API instead of 'films' from mock data in Helpers folder
import { getFilmsFromApiWithSearchedText } from '../API/TheMovieDataBaseAPI';

class Search extends Component {
  constructor(props) {
    super(props)
    this.searchedText = ""
    this.page = 0 // Compteur pour connaître la page courante
    this.totalPages = 0 // Nombre de pages totales pour savoir si on a atteint la fin des retours de l'API TMDB
    this.state = {
      films: [],
      isLoading: false // Par défaut à false car il n'y a pas de chargement tant qu'on ne lance pas de recherche
    }
  }

  //this function will be called in _searchFilms() to initialize to zero.
  _loadFilms() {
    //search movie ONLY if text is typed
    if (this.searchedText.length > 0) {

      //Lancement du charchement (preloader)
      this.setState({ isLoading: true });
      //search movie by typed text
      getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(data => {
        this.page = data.page
        this.totalPages = data.total_pages
        this.setState({
          films: [...this.state.films, ...data.results], //same as this.state.films.concat(data.results)
          isLoading: false //Arrêt du charchement stop preloader
        })
      });
    }
  };

  //get typed text in input and use it in _loadFilms to render
  _searchTextInputChanged(text) {
    this.searchedText = text;
  }

  _searchFilms() {
    //Ici on a remis à zero les films de notre state
    this.page = 0;
    this.totalPages = 0;
    this.setState({
      films: []
    }, () => {
      //It is called and return data just right after initializing of setState and putting everything in data to zero
      this._loadFilms();

      //J'utilise la paramètre length sur mon tableau de films pour vérifier qu'il y a bien 0 film
      //console.log("Page: " + this.page + " / TotalPages: " + " / Nombre de films: " + this.state.films.length)
    })

  }

  _displayDetailForFilm = (idFilm) => {
    console.log("Display film with id " + idFilm)
    this.props.navigation.navigate("FilmDetail", { idFilm: idFilm });
  }


  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
          {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
        </View>
      )
    }
  }

  render() {
    //console.log(this.state.isLoading); //check if isLoading switches between false and true
    //console.log("Render. setState is called, components called with movie data ");

    //console.log(this.props); //On a un objet navigation qui s'est ajouté à nos props. Et bien, c'est cet objet qui va nous permettre d'utiliser la navigation dans notre component Search. 

    return (
      <View style={styles.main_container}
      // On définit la props onPress sur notre View pour appeler notre fonction displayDetailForFilm
      //onPress={() => displayDetailForFilm(film.id)}

      >
        <TextInput
          //let to find exact movie that we search by typing in input & clicking "rechercher" button
          onChangeText={(text) => this._searchTextInputChanged(text)}

          //let us search by clicking "enter" on keyboard and not only by clicking on "rechercher" button
          onSubmitEditing={() => this._searchFilms()}

          style={[styles.textinput, { marginBottom: 5 }]}
          placeholder='Titre du film' />
        <Button title='Rechercher'
          onPress={() => this._searchFilms()}
        />
        <FlatList
          data={this.state.films}
          // On utilise la prop extraData pour indiquer à notre FlatList que d’autres données doivent être prises en compte si on lui demande de se re-rendre
          extraData={this.props.favoritesFilm}
          keyExtractor={item => item.id.toString()}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.page < this.totalPages) { // On vérifie qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
              this._loadFilms()
            }
          }}
          renderItem={({ item }) => 
            <FilmItem 
                  film={item} 
                  displayDetailForFilm={this._displayDetailForFilm} 
                  // Ajout d'une props isFilmFavorite pour indiquer à l'item d'afficher un 🖤 ou non
                  isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
            />
          }
        />
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  textinput: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5,
    borderRadius: 10
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

// On connecte le store Redux, ainsi que les films favoris du state de notre application, à notre component Search
const mapStateToProps = state => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(Search)