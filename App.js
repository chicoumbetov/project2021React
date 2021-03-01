import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import Navigation from './Navigation/Navigation';
import { Provider } from 'react-redux'
import Store from './Store/configureStore'

export default class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <Navigation />
      </Provider>

    );
  }
}