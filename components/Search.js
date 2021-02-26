import React, { Component } from 'react';
import {
  View, Button,
  TextInput, StyleSheet,
  FlatList, ActivityIndicator
} from 'react-native';
import FilmItem from './FilmItem';

//import films from '../Helpers/filmsData';   //this.state.films is used from API instead of 'films' from mock data in Helpers folder
import { getFilmsFromApiWithSearchedText } from '../API/TheMovieDataBaseAPI';

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      films: [],
      isLoading: false // Par défaut à false car il n'y a pas de chargement tant qu'on ne lance pas de recherche
    }
    this.searchedText = ""
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

  _loadFilms() {
    //search movie ONLY if text is typed
    if (this.searchedText.length > 0) {
      //Lancement du charchement (preloader)
      this.setState({ isLoading: true });
      //search movie by typed text
      getFilmsFromApiWithSearchedText(this.searchedText).then(data => {
        this.setState({
          films: data.results,
          isLoading: false //Arrêt du charchement stop preloader
        })
      });
    }
  };

  //get typed text in input and use it in _loadFilms to render
  _searchTextInputChanged(text) {
    this.searchedText = text;
  }


  render() {
    console.log(this.state.isLoading); //check if isLoading switches between false and true
    //console.log("Render. setState is called, components called with movie data ");
    return (
      <View style={styles.main_container}>
        <TextInput
          //let to find exact movie that we search by typing in input & clicking "rechercher" button
          onChangeText={(text) => this._searchTextInputChanged(text)}

          //let us search by clicking "enter" on keyboard and not only by clicking on "rechercher" button
          onSubmitEditing={() => this._loadFilms()}

          style={[styles.textinput, { marginBottom: 5 }]}
          placeholder='Titre du film' />
        <Button title='Rechercher'
          onPress={() => this._loadFilms()}
        />
        <FlatList
          data={this.state.films}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <FilmItem film={item} />}
        />
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    marginTop: 20,
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

export default Search;