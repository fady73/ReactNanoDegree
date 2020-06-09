import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { getAllDecks } from './actions/app'
import 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import SingleDeck from './components/SingleDecks/SingleDeck';
import CreateNewCard from './components/CreateNewCard/CreateNewCard';
import Quiz from './components/Quiz/Quiz';
import Constants from "expo-constants";
import middleware from './middleware'
import TabNav from './components/Tabs'
import {

  setLocalNotification,
} from "./utils/helpers";

function CustomStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const HomeScreenNavigator = createAppContainer(createStackNavigator({
  Home: {
    screen: TabNav,
    navigationOptions: {
      headerShown: false
    }
  },
  Deck: {
    screen: SingleDeck,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.deck.title,
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'rgb(0,0,0)',
      }
    })
  },
  CreateNewCard: {
    screen: CreateNewCard,
    navigationOptions: ({navigation}) => ({
      title: 'Add Card',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'rgb(0,0,0)',
      }
    })
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({navigation}) => ({
      title: `Quiz: ${navigation.state.params.deck.title}`,
      headerBackTitle: '',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'rgb(0,0,0))',
      }
    })
  }
}, 
));

const store = createStore(reducer, middleware);

class App extends React.Component {
  storageKey = '@mobile-flashcard:state';

  componentDidMount() {
    store.dispatch(getAllDecks());
    setLocalNotification();
  }

  render() {
    return (
    <Provider store={store}>
      <View style={{flex: 1}}>
          <CustomStatusBar backgroundColor={'rgb(0,0,0)'} />
          <HomeScreenNavigator />
        </View>
    </Provider>
    );
  }
}

export default App;