import React, { Component } from 'react';
import {
  AsyncStorage,
  ScrollView,
  Text,
  View,
  TextInput,
  Button,
  Alert
 } from 'react-native';

import ApiUtils from './ApiUtils'


var Person = {
  endpoint: '',
  username: '',
  password: '',
  isLoggingIn: false,
  message: '',
  token: ''
}

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogin: false
    };
  }

  async _onValueChange(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  async _userGetInfo() {
  	Person.username = await AsyncStorage.getItem('username'),
  	Person.password = await AsyncStorage.getItem('password'),
  	Person.endpoint = await AsyncStorage.getItem('endpoint')
  	if (Person.endpoint == '') {
  		Person.endpoint = "http://127.0.0.1"
  	}
  }

  _validateURL(url) {
  	var re = /(^(http|https)\:\/\/)/;
  	return re.test(url)
  }

  _userSignin() {
  	if (!this._validateURL(Person.endpoint)) {
  		Alert.alert(
	        "Url must be http|https://xxx"
			)
  	} else {
	    fetch(Person.endpoint + "/login", {
	      method: "POST",
	      headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	      },
	      body: JSON.stringify({
	      username: Person.username,
	      password: Person.password,
	      })
	    })
	    .then((response) => response.json())
	    .then(ApiUtils.checkLogin)
	    .then((responseData) => {
	      if (responseData.token) {
	        console.log(responseData.token);
	        this._onValueChange('token', responseData.token)
	        this._onValueChange('endpoint', Person.endpoint)
	        this._onValueChange('username', Person.username)
	        this._onValueChange('password', Person.password)  
			    this.setState({
			      islogin: true,
			    });
	      } else {
	      	console.log("alo failed")
	      	console.log(Person)
			    this.setState({
			      islogin: false,
			    });
	      }
	    })
	    .catch((error) => {
	      console.warn(error);
	    });  		
  	}
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          User signed in already
        </Text>
      </View>
    ); 
  }

  componentWillMount() {
    this._userGetInfo()
    setTimeout(this._userSignin.bind(this), 2000)
  }

  render() {
  	const { navigate } = this.props.navigation;
  	// console.log(this.state.islogin)
  	// console.log(Person)
  	// if (!this.state.islogin) {
  	// 	this._userGetInfo()
  	// 	setTimeout(this._userSignin.bind(this), 2000)
  	// }

    return (
      <ScrollView style={{padding: 20}}>
        <Text 
          style={{fontSize: 27}}>
          Login
        </Text>
        <TextInput
          placeholder='Endpoint'
          returnKeyLabel = {"endpoint"}
          defaultValue={Person.endpoint}
          onChangeText={(endpoint) => Person.endpoint=endpoint}
        />
        <TextInput
          placeholder='Username'
          returnKeyLabel = {"username"}
          defaultValue={Person.username}
          onChangeText={(username) => Person.username=username}
        />
        <TextInput
          placeholder='Password'
          returnKeyLabel = {"password"}
          onChangeText = {(password) => Person.password=password}
          secureTextEntry = {true}
        />
        <View style={{margin:7}} />
        <Button 
          disabled={this.state.islogin}
          onPress={this._userSignin.bind(this)}
          title="Submit"
        />
        <Button 
          disabled={!this.state.islogin}
          onPress={() => navigate('Dashboard')}
          title="Dashboard"
        />
      </ScrollView>
     )
  }

}
