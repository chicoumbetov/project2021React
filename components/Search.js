import React, { Component } from 'react';
import { Text } from 'react-native';

class Search extends Component {
  render() {
      const name = "Murzik"
      return (
          <Text> Hello, it's search component with cat name - {name} </Text>
      )
  }
}

export default Search;