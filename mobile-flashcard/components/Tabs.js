import React from 'react'
import { Platform } from 'react-native'
import AllDecks from './AllDecks/AllDecks'
import CreateNewDeck from './CreateNewDeck/CreateNewDeck'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {  Ionicons } from '@expo/vector-icons';

const Tabs = {
    Decks: {
      screen: AllDecks,
      navigationOptions: {
        tabBarLabel: 'Show All Decks',
        tabBarIcon:({tintColor})=> <Ionicons name={Platform.OS === 'ios'?'ios-list-box':'md-list-box'} size={30} color={tintColor} />
      },
    },
    CreateNewDeck: {
      screen: CreateNewDeck,
      navigationOptions: {
        tabBarLabel: 'Add New Deck',
        tabBarIcon:({tintColor})=><Ionicons name={Platform.OS === 'ios'?'ios-add-circle':"md-add-circle"} size={30} color={tintColor}/>
      },
    }
  }
  
  const navigationOptions = {
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? 'rgb(0,0,0)' : 'white',
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? 'white' : 'rgb(0,0,0)',
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
  
  const TabNav = createBottomTabNavigator(Tabs, navigationOptions)

  export default TabNav