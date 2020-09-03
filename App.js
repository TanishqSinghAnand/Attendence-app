import * as React from 'react';
import {View,Text,Button,StyleSheet,ScrollView} from 'react-native';
import AppHeader from './components/AppHeader';
import HomeScreen from './screens/HomeScreen';
import SummaryScreen from './screens/SummaryScreen';
import {createAppContainer, createSwitchNavigator}from 'react-navigation';
import InputScreen from './screens/InputClass'
import { createBrowserApp } from '@reactnavigation/web'
export default class App extends React.Component{

  render(){
    return(
      <ScrollView>
      <View>
      <AppHeader/>
      <AppContainer/>
      </View>
      </ScrollView>
    )
  }
  

}
var AppNavigator = createSwitchNavigator({
  InputScreen:InputScreen,
  SummaryScreen:SummaryScreen,
  HomeScreen:HomeScreen,

  
})

const AppContainer = createAppContainer(AppNavigator)


