import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TextInput,
  Button
} from 'react-native';

import { StackNavigator, TabNavigator } from 'react-navigation';

import ApiUtils from './ApiUtils'
import Login from './Login'
import Dashboard from './Dashboard'
import IssueInfo from './childScreen/IssueInfo'

var Person = {
  endpoint: '',
  username: '',
  password: '',
  isLoggingIn: false,
  message: '',
  token: ''
}

class LoginScreen extends React.Component {
  render() {
    return(
      <View>
        <Login navigation={this.props.navigation}/>
      </View>
    )
  }
}

class DashboardScreen extends React.Component {
  render() {
    return(
      <View>
        <Dashboard navigation={this.props.navigation}/>
      </View>
    )
  }
}

class IssueInfoScreen extends React.Component {
  render() {
    return(
      <View>
        <IssueInfo navigation={this.props.navigation}/>
      </View>
    )
  }
}


const LoginNavigator = TabNavigator({
  Login: {screen: LoginScreen},
  // Dashboard: { screen: DashboardScreen },
  // // All: { screen: AllContactsScreen },
});

const SimpleApp = StackNavigator({
  Home: {
    screen: LoginNavigator,
    navigationOptions: {
      title: '\t\t\t\t\t\t\t\t\t\t\t\t\tMonitor Dashboard',
    }
  },
  IssueInfo: { 
    screen: IssueInfoScreen,
    navigationOptions: {
      title: 'Issue',
    }    
  },

  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: {
      title: 'Dashboard',
    }    
  },
  // RecentChatsScreen: { screen: RecentChatsScreen },
});

export default class App extends React.Component {
  render() {
    return <SimpleApp />;
  }
}

