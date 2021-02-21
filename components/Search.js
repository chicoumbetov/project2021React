import React, { Component } from 'react';
import { ScrollView, Button, TextInput, StyleSheet, Alert, FlatList, Text } from 'react-native';
import films from '../Helpers/filmsData';
import FilmItem from './FilmItem';

class Search extends Component {
  render() {

    return (
      <ScrollView style={styles.main_container}>
        <TextInput style={[styles.textinput, { marginBottom: 5 }]} placeholder='Titre du film' />
        <Button title='Rechercher'
          onPress={() => Alert.alert('"Rechercher" button pressed')}
        />
        <FlatList
          data={films}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <FilmItem/>}
        />
      </ScrollView>
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