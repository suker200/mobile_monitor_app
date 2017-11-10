import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TextInput,
  Button,
  Image,
} from 'react-native';

import { StackNavigator, TabNavigator } from 'react-navigation';
import { DrawerNavigator } from 'react-navigation';

class MyHomeScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./image/icons8-search.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    );
  }
}

class MyNotificationsScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Notifications',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./image/icons8-search.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.goBack()}
        title="Go back home"
      />
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

class LoginScreen2 extends React.Component {
  render() {
    // const { navigate } = this.props.navigation;
    return(
      <Button
        onPress={() => navigate('SideBar3')}
        title='OKIE'
      />
    );
  }
}

const MyApp = DrawerNavigator({
  Home: {
    screen: MyHomeScreen,
  },
  Notifications: {
    screen: MyNotificationsScreen,
  },
});

const SimpleApp2 = StackNavigator({
  Home: {
    screen: LoginScreen2,
    navigationOptions: {
      title: '\t\t\t\t\t\t\t\t\t\t\t\t\tMonitor1 Dashboard',
    }
  },

  SideBar3: {
    screen: MyApp,
    navigationOptions: {
      title: 'SideBar',
    }    
  },
});


export default class Dashboard extends React.Component {
  render() {
    return <SimpleApp2 />;
  }
}

