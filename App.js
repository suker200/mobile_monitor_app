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
  Image
} from 'react-native';

import { StackNavigator, TabNavigator } from 'react-navigation';

import ApiUtils from './ApiUtils'
import Login from './Login'
import Issues from './childScreen/Issues'
import IssueInfo from './childScreen/IssueInfo'

import { DrawerNavigator } from 'react-navigation';

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

class DashboardHome extends React.Component {
  // static navigationOptions = {
  //   drawerLabel: 'Home',
  //   drawerIcon: ({ tintColor }) => (
  //     <Image
  //       source={require('./image/dashboard_home.png')}
  //       style={[styles.icon, {tintColor: tintColor}]}
  //     />
  //   ),
  // };

  render() {
    return(
        <View>
          <Text style={styles.dashboard} onPress={() => this.props.navigation.navigate('DrawerOpen')}>PUSH ME</Text>
          <Text> "Happy Polla"  </Text>
        </View>
      )
  }
}

class DashboardScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return(
        <DashboardStack />
      );
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

const IssueStack = StackNavigator({
  Issues: {
    screen: Issues,
    navigationOptions: {
      title: 'Issues',
    }    
  },
  IssueInfo: { 
    screen: IssueInfoScreen,
    navigationOptions: {
      title: 'IssueInfo',
    }    
  },
}, {
  headerMode: 'float',
  navigationOptions: ({navigation}) => ({
    headerTintColor: '#2F95D6',
    headerStyle: {
      backgroundColor: '#ffffff',
      borderBottomColor: '#2F95D6',
      borderBottomWidth: 3
    },
    headerRight: <Text style={styles.menu} onPress={() => navigation.navigate('DrawerOpen')}>Menu</Text>
  })
})

const SideBar = DrawerNavigator({
  Home: {
    screen: DashboardHome,
  },
  Issues: {
    screen: IssueStack,
  },
});


const DashboardStack = StackNavigator({
  Dashboard: {
    screen: SideBar,
  }
},{
  headerMode: 'none'
})

const SimpleApp = StackNavigator({
  Home: {
    screen: Login,
    navigationOptions: {
      title: 'Monitor Dashboard',
    }
  },

  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: {
      title: 'Dashboard',
    }    
  },
}, {
  headerMode: 'screen',
  navigationOptions: { header: null } // ADDED THIS
});

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 20,
  },
  icon: {
    width: 24,
    height: 24,
  },
  dashboard: {
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    textAlign: 'center',
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 50,    
  }
});

export default class App extends React.Component {
  render() {
    return <SimpleApp />;
  }
}

