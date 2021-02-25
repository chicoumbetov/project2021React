import React, { Component } from 'react';
import { View, Button, TextInput, StyleSheet, Alert, FlatList, Text } from 'react-native';
import FilmItem from './FilmItem';

//import films from '../Helpers/filmsData';   //this.state.films is used from API instead of 'films' from mock data in Helpers folder
import { getFilmsFromApiWithSearchedText} from '../API/TheMovieDataBaseAPI';

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = { films: [] }
  }


  _loadFilms() {
    getFilmsFromApiWithSearchedText("star").then(data => this.setState({ films: data.results }));
  };

  render() {
    console.log("setState is called, components called with movie data ");
    return (
      <View style={styles.main_container}>
        <TextInput style={[styles.textinput, { marginBottom: 5 }]} placeholder='Titre du film' />
        <Button title='Rechercher'
          onPress={() => this._loadFilms()}
        />
        <FlatList
          data={this.state.films}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <FilmItem film={item} />}
        />
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
});

export default Search;