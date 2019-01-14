import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import Expo from 'expo';
import { MapView } from 'expo';
import Home from './Home';
import Maps from './Maps';

const MyApp = createStackNavigator({

  HomePlaces: { screen: Home },
  Map: { screen: Maps },

});
const AppContainer = createAppContainer(MyApp);
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
