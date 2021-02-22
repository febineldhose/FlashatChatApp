import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {MainNavig} from './src/MainNavig';
class App extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <MainNavig />
      </SafeAreaView>
    );
  }
}
export default App;
